import { Component, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment';
import { catchError, combineLatest, filter, of, switchMap, tap } from 'rxjs';
import { ClinicService } from '../../services/clinic/clinic.service';
import { PerformanceIndexService } from '../../services/performance/performance-index.service';
@Component({
  selector: 'app-dashboard-feedback',
  templateUrl: './dashboard-feedback.component.html',
  styleUrls: ['./dashboard-feedback.component.scss']
})
export class DashboardFeedbackComponent implements OnInit, OnDestroy {
  constructor(private clinicService: ClinicService
    , private performanceIndexService: PerformanceIndexService) { }
  ngOnDestroy(): void {
    this.clinicService.filterDate$.next(null)
  }

  ngOnInit(): void {
    combineLatest([this.clinicService.selectedClinic$, this.clinicService.filterDate$])
      .pipe(
        tap(result => console.log(result)),
        switchMap(result => {
          const obs$ = this.performanceIndexService.get(result[0] === null ? 1 : result[0]
            , result[1] === null ? moment(new Date(moment().startOf('month').format('YYYY-MM-DD'))).startOf('day').valueOf() : result[1][0]
            , result[1] === null ? moment(new Date(moment().endOf('month').format('YYYY-MM-DD'))).endOf('day').valueOf() : result[1][1])
          return obs$.pipe(
            catchError(err => of(err))
          );
        }),
      ).subscribe(result => console.log(result), (err) => console.log(err.error.message))
  }

}
