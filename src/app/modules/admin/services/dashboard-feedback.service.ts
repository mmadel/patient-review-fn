import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FeedbackNumbers } from '../models/feedback.numbers';

@Injectable({
  providedIn: 'root'
})
export class DashboardFeedbackService {
  private userUrl = environment.baseURL + 'dashboard'
  constructor(private htpClient: HttpClient) { }

  public getFeedbackNumbers(startDate: number, endDate: number) {
    var findNumbersURL = this.userUrl + '/find/numbers/' +
      'startDate/' + startDate + '/endDate/' + endDate;
    return this.htpClient.get<FeedbackNumbers>(`${findNumbersURL}`, { observe: 'response' })
  }
}
