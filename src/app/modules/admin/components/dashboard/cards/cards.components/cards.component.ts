import { Component, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment';
import { catchError, combineLatest, filter, of, switchMap, tap } from 'rxjs';
import { ClinicService } from 'src/app/modules/admin/services/clinic/clinic.service';
import { PerformanceIndexService } from 'src/app/modules/admin/services/performance/performance-index.service';
import { CardPerformanceDataRetrieval } from '../card.performance.data.retrieval';
import { ServicePerformanceData } from '../cards.models/service.performance.data';

@Component({
  selector: 'dashboard-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit, OnDestroy {
  hospitalityServiceData: ServicePerformanceData[];
  clinicalServiceData: ServicePerformanceData[];
  constructor(private clinicService: ClinicService, private performanceIndexService: PerformanceIndexService) { }

  ngOnDestroy(): void {
    this.clinicService.filterDate$.next(null)
  }
  ngOnInit(): void {
    combineLatest([this.clinicService.selectedClinic$, this.clinicService.filterDate$])
      .pipe(
        tap((result) => { }),
        filter((result) => result[0] !== null),
        switchMap(result => {
          var startDate = result[1] === null ? moment(new Date(moment().startOf('month').format('YYYY-MM-DD'))).startOf('day').valueOf() : result[1][0];
          var endDate = result[1] === null ? moment(new Date(moment().endOf('month').format('YYYY-MM-DD'))).endOf('day').valueOf() : result[1][1];
          const obs$ = this.performanceIndexService.get(result[0], startDate, endDate);
          return obs$.pipe(
            catchError(err => of(err))
          );
        }),
      ).subscribe((result) => {

        for (const [key, value] of Object.entries(CardPerformanceDataRetrieval.retrieve(result.body))) {
          for (const [dkey, dvalue] of Object.entries(value)) {
            if (dkey === 'hospitalityService') {
              this.hospitalityServiceData = dvalue;
            }
            if (dkey === 'clinicalService') {
              this.clinicalServiceData = dvalue;
            }
          }

        }
      }, (err) => {})
  }

}
