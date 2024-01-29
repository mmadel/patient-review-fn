import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PerformanceChartResponse } from '../../models/performance.chart.response';
import { PerformanceIndexContainer } from '../../models/performance.index/performance.index.container';

@Injectable({
  providedIn: 'root'
})
export class PerformanceIndexService {
  private userUrl = environment.baseURL + 'performance'
  constructor(private http: HttpClient) { }

  get(clinicId: number | null, startDate: number | null, endDate: number | null) {
    return this.http.get<PerformanceIndexContainer>(`${this.userUrl}` + '/get/startDate/' + startDate + '/endDate/' + endDate + '/clinicId/' + clinicId, { observe: 'response' })
  }

  getChartData(clinicId: number | null, startDate: number | null, endDate: number | null, unit: string) {
    return this.http.get<PerformanceChartResponse>(`${this.userUrl}` + '/get/chart' 
      + '/startDate/' + startDate
      + '/endDate/' + endDate
      + '/clinicId/' + clinicId
      + '/chartTimeUnit/' + unit)
  }

  getCounter(clinicId: number | null, startDate: number | null, endDate: number | null){
    return this.http.get<PerformanceIndexContainer>(`${this.userUrl}` + '/get/counters/startDate/' + startDate + '/endDate/' + endDate + '/clinicId/' + clinicId, { observe: 'response' })
  }
}
