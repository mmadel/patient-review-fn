import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { DashboardChartsData, IChartProps } from '../dashboard/dashboard-charts-data';

@Component({
  selector: 'app-hospitality-dashboard',
  templateUrl: './hospitality-dashboard.component.html',
  styleUrls: ['./hospitality-dashboard.component.css']
})
export class HospitalityDashboardComponent implements OnInit {
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
