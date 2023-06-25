import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
    return this.httpClient.post(changePatientRequiredFieldsURL, JSON.stringify(reportCriteria), { 'headers': headers, responseType: 'blob' })
  }
}
