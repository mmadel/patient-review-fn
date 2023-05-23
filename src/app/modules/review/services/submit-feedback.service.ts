import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FeedBack } from '../model/feedback';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SubmitFeedbackService {
  private userUrl = environment.baseURL + 'patient/submit'
  constructor(private httpClient: HttpClient) { }

  public submit(feedBack: FeedBack){
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.post(`${this.userUrl}`, JSON.stringify(feedBack), { 'headers': headers, observe: 'response' })
  }
}
