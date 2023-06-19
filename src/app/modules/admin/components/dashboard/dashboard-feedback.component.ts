import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import * as moment from 'moment';
import { catchError, combineLatest, of, switchMap } from 'rxjs';
import { PerformanceChartResponse } from '../../models/performance.chart.response';
import { ClinicService } from '../../services/clinic/clinic.service';
import { PerformanceIndexService } from '../../services/performance/performance-index.service';
import { ClinicalChartsData } from './chart/clinical-charts-data';
import { HospitalityChartsData } from './chart/hospitality-charts-data';
import { IChartProps } from './chart/IChartProps';
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
  loading: boolean = false;
  constructor(private clinicService: ClinicService, private performanceIndexService: PerformanceIndexService
    , private clinicalChartsData: ClinicalChartsData
    , private hospitalityChartsData: HospitalityChartsData) { }
  ngOnDestroy(): void {
    this.clinicService.filterDate$.next(null)
  }
  public mainChart: IChartProps = {};
  public hospitalityMainChart: IChartProps = {};
  public clinicalMainChart: IChartProps = {};
  ngOnInit(): void {

    this.initCharts();
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
  public trafficRadioGroup = new UntypedFormGroup({
    trafficRadio: new UntypedFormControl('Month')
  });
  setTrafficPeriod(value: string): void {
    this.trafficRadioGroup.setValue({ trafficRadio: value });


    this.initCharts();
  }
  initCharts(): void {

    this.performanceIndexService.getChartData(1, 1685566800000, 1688158799000, 'Month')
      .subscribe((result) => {
        this.loading = true;
        this.hospitalityChartsData.happyIndexData = result.body?.hospitalityChartData[0];
        this.hospitalityChartsData.npsData = result.body?.hospitalityChartData[1];
        this.hospitalityChartsData.averageData = result.body?.hospitalityChartData[2];


        this.hospitalityChartsData.initMainChart('Month');

        this.hospitalityMainChart = this.hospitalityChartsData.mainChart;
      });
  }

}
