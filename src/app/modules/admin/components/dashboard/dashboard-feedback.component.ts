import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { PerformanceIndexService } from '../../services/performance/performance-index.service';
import { ClinicalChartsData } from './charts/clinical-charts-data';
import { HospitalityChartsData } from './charts/hospitality-charts-data';
import { IChartProps } from './charts/IChartProps';

@Component({
  selector: 'app-dashboard-feedback',
  templateUrl: './dashboard-feedback.component.html',
  styleUrls: ['./dashboard-feedback.component.scss']
})
export class DashboardFeedbackComponent implements OnInit {

  loading: boolean = false;
  constructor(private performanceIndexService: PerformanceIndexService
    , private clinicalChartsData: ClinicalChartsData
    , private hospitalityChartsData: HospitalityChartsData) { }

  public mainChart: IChartProps = {};
  public hospitalityMainChart: IChartProps = {};
  public clinicalMainChart: IChartProps = {};
  ngOnInit(): void {

    this.initCharts();

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
