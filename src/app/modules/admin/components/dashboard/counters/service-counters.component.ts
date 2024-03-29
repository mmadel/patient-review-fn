import { Component, OnInit } from '@angular/core';
import { cilFrown, cilHappy, cilMeh, cilMoodVeryGood } from '@coreui/icons';
import * as moment from 'moment';
import { catchError, combineLatest, filter, of, switchMap, tap } from 'rxjs';
import { ClinicalCountersContainer } from '../../../models/counters/clinical.counters.container';
import { CountersContainer } from '../../../models/counters/counters.container';
import { HospitalityCounterContainer } from '../../../models/counters/hospitality.counter.container';
import { ClinicService } from '../../../services/clinic/clinic.service';
import { PerformanceIndexService } from '../../../services/performance/performance-index.service';
import { countersContainerFiller } from './counters.container.filler';
@Component({
  selector: 'app-service-counters',
  templateUrl: './service-counters.component.html',
  styleUrls: ['./service-counters.component.css']
})
export class ServiceCountersComponent implements OnInit {

  constructor(private clinicService: ClinicService, private performanceIndexService: PerformanceIndexService) { }
  icons = { cilMoodVeryGood, cilHappy, cilMeh, cilFrown };
  data: any;
  total: number;
  ngOnInit(): void {
    combineLatest([this.clinicService.selectedClinic$, this.clinicService.filterDate$])
      .pipe(
        tap((result) => { }),
        filter((result) => result[0] !== null && result[0]!.id !== null),
        switchMap(result => {          
          var startDate = result[1] === null ? moment(new Date(moment().startOf('month').format('YYYY-MM-DD'))).startOf('day').valueOf() : result[1][0];
          var endDate = result[1] === null ? moment(new Date(moment().endOf('month').format('YYYY-MM-DD'))).endOf('day').valueOf() : result[1][1];
          const obs$ = this.performanceIndexService.getCounter(result[0]!.id, startDate, endDate);
          return obs$.pipe(
            catchError(err => of(err))
          );
        }),
      ).subscribe((result) => {
        var countersContainer: CountersContainer = {
          hospitalityCounterContainer: {
            veryPositive: 0,
            positive: 0,
            negative: 0,
            veryNegative: 0,
            total: 0,
            veryPositivePercentage: 0,
            positivePercentage: 0,
            negativePercentage: 0,
            veryNegativePercentage: 0
          },
          clinicalCountersContainer: {
            veryPositive: 0,
            positive: 0,
            negative: 0,
            veryNegative: 0,
            total: 0,
            veryPositivePercentage: 0,
            positivePercentage: 0,
            negativePercentage: 0,
            veryNegativePercentage: 0
          }
        }
        if (result.body !== undefined)
          for (const [key, value] of Object.entries(result.body)) {
            if (key === 'hospitalityCounterContainer') {
              countersContainer.hospitalityCounterContainer = <HospitalityCounterContainer>value;

            }
            if (key === 'clinicalCountersContainer') {
              countersContainer.clinicalCountersContainer = <ClinicalCountersContainer>value;
            }
          }
        this.data = countersContainerFiller.fill(countersContainer);
        this.total = countersContainer.hospitalityCounterContainer.total;
      }, (err) => { })
  }

}
