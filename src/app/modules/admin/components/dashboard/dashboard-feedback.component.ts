import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as moment from 'moment';
import { catchError, combineLatest, of, switchMap } from 'rxjs';
import { ClinicService } from '../../services/clinic/clinic.service';
import { PerformanceIndexService } from '../../services/performance/performance-index.service';
import { PerformanceDataCreator } from './service.data/performance.data.creator';
import { ServicePerformanceData } from './service.data/service.performance.data';
@Component({
  selector: 'app-dashboard-feedback',
  templateUrl: './dashboard-feedback.component.html',
  styleUrls: ['./dashboard-feedback.component.scss']
})
export class DashboardFeedbackComponent implements OnInit, OnDestroy {

  hospitalityServiceData: ServicePerformanceData[];
  clinicalServiceData: ServicePerformanceData[];
  constructor(private clinicService: ClinicService
    , private performanceIndexService: PerformanceIndexService
    , private sanitizer: DomSanitizer) { }
  ngOnDestroy(): void {
    this.clinicService.filterDate$.next(null)
  }

  ngOnInit(): void {
    combineLatest([this.clinicService.selectedClinic$, this.clinicService.filterDate$])
      .pipe(
        switchMap(result => {
          const obs$ = this.performanceIndexService.get(result[0] === null ? 1 : result[0]
            , result[1] === null ? moment(new Date(moment().startOf('month').format('YYYY-MM-DD'))).startOf('day').valueOf() : result[1][0]
            , result[1] === null ? moment(new Date(moment().endOf('month').format('YYYY-MM-DD'))).endOf('day').valueOf() : result[1][1])
          return obs$.pipe(
            catchError(err => of(err))
          );
        }),
      ).subscribe(result => {
        for (const [key, value] of Object.entries(PerformanceDataCreator.create(result.body))) {
          for (const [dkey, dvalue] of Object.entries(value)) {
            if (dkey === 'hospitalityService') {
              this.hospitalityServiceData = dvalue;
            }
            if (dkey === 'clinicalService') {
              this.clinicalServiceData = dvalue;
            }
          }

        }
      }, (err) => console.log(err.error.message))
  }

}
