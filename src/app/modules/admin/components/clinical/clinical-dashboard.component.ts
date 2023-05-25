import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { IChartProps, DashboardChartsData } from '../dashboard/dashboard-charts-data';

@Component({
  selector: 'app-clinical-dashboard',
  templateUrl: './clinical-dashboard.component.html',
  styleUrls: ['./clinical-dashboard.component.css']
})
export class ClinicalDashboardComponent implements OnInit {
  public trafficRadioGroup = new UntypedFormGroup({
    trafficRadio: new UntypedFormControl('Month')
  });
  public mainChart: IChartProps = {};
  constructor(private chartsData: DashboardChartsData) { }

  ngOnInit(): void {
    this.initCharts();
  }
  initCharts(): void {
    this.mainChart = this.chartsData.mainChart;
  }
  setTrafficPeriod(value: string): void {
    this.trafficRadioGroup.setValue({ trafficRadio: value });
    this.chartsData.initMainChart(value);
    this.initCharts();
  }

}
