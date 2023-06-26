import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ExcelReportCriteria } from '../../models/report/excel.report.criteria';

@Injectable({
  providedIn: 'root'
})
export class ExcelReportService {
  private baseUrl = environment.baseURL + 'reports';
  constructor(private httpClient: HttpClient) { }

  public export(reportCriteria: ExcelReportCriteria){
    const headers = { 'content-type': 'application/json' }
    const changePatientRequiredFieldsURL = this.baseUrl + '/excel';
    return this.httpClient.post(changePatientRequiredFieldsURL, JSON.stringify(reportCriteria), { 'headers': headers, responseType: 'blob'})
    .pipe(catchError(this.handleError));
  }
  handleError(error: any) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
        // client-side error
        errorMessage = `Error: ${error.message}`;
    } else {
        // server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage))
  }
}

