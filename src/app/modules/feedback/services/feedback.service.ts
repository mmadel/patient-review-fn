import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PatientFeedback } from '../models/patient.feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private userUrl = environment.baseURL + 'patient/submit'
  constructor(private httpClient: HttpClient) { }

  public submit(patientFeedback: PatientFeedback) {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.post(`${this.userUrl}`, JSON.stringify(patientFeedback), { 'headers': headers, observe: 'response' })
  }
}
