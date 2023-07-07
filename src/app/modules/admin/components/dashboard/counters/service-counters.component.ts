import { AfterContentInit, Component, Input } from '@angular/core';
import { cilFrown, cilHappy, cilMeh, cilMoodVeryGood } from '@coreui/icons';
import { ClinicService } from '../../../services/clinic/clinic.service';
import { PerformanceIndexService } from '../../../services/performance/performance-index.service';
import { catchError, combineLatest, filter, of, switchMap, tap } from 'rxjs';
import * as moment from 'moment';
import { CountersContainer } from '../../../models/counters/counters.container';
import { HospitalityCounterContainer } from '../../../models/counters/hospitality.counter.container';
import { ClinicalCountersContainer } from '../../../models/counters/clinical.counters.container';
@Component({
  selector: 'app-service-counters',
  templateUrl: './service-counters.component.html',
  styleUrls: ['./service-counters.component.css']
})
export class ServiceCountersComponent implements AfterContentInit {

  constructor(private clinicService: ClinicService, private performanceIndexService: PerformanceIndexService) { }
  icons = { cilMoodVeryGood, cilHappy, cilMeh, cilFrown };
  @Input() withCharts?: boolean = true;
  brandData = [
    {
      icon: this.icons.cilMoodVeryGood,
      color: 'success',
      values: [{ title: 'friends', value: '89K' }, { title: 'feeds', value: '459' }],
      capBg: { '--cui-card-cap-bg': '#3b5998' },


    },
    {
      icon: this.icons.cilHappy,
      color: 'info',
      values: [{ title: 'followers', value: '973k' }, { title: 'tweets', value: '1.792' }],
      capBg: { '--cui-card-cap-bg': '#00aced' },

    },
    {
      icon: this.icons.cilMeh,
      color: 'warning',
      values: [{ title: 'contacts', value: '500' }, { title: 'feeds', value: '1.292' }],
      capBg: { '--cui-card-cap-bg': '#4875b4' },
    },
    {
      icon: this.icons.cilFrown,
      color: 'danger',
      values: [{ title: 'contacts', value: '500' }, { title: 'feeds', value: '1.292' }],
      capBg: { '--cui-card-cap-bg': '#4875b4' },
    },
  ];
  capStyle(value: string) {
    return !!value ? { '--cui-card-cap-bg': value } : {};
  }

  ngAfterContentInit(): void {
  }
  ngOnInit(): void {
    combineLatest([this.clinicService.selectedClinic$, this.clinicService.filterDate$])
      .pipe(
        tap((result) => { }),
        filter((result) => result[0] !== null),
        switchMap(result => {
          var startDate = result[1] === null ? moment(new Date(moment().startOf('month').format('YYYY-MM-DD'))).startOf('day').valueOf() : result[1][0];
          var endDate = result[1] === null ? moment(new Date(moment().endOf('month').format('YYYY-MM-DD'))).endOf('day').valueOf() : result[1][1];
          const obs$ = this.performanceIndexService.getCounter(result[0], startDate, endDate);
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
            veryNegative: 0
          },
          clinicalCountersContainer: {
            veryPositive: 0,
            positive: 0,
            negative: 0,
            veryNegative: 0
          }
        }
        for (const [key, value] of Object.entries(result.body)) {
          if (key === 'hospitalityCounterContainer') {
            countersContainer.hospitalityCounterContainer = <HospitalityCounterContainer>value;

          }
          if (key === 'clinicalCountersContainer') {
            countersContainer.clinicalCountersContainer = <ClinicalCountersContainer>value;
          }
        }
        console.log(JSON.stringify(countersContainer))
      }, (err) => { })
  }

}
