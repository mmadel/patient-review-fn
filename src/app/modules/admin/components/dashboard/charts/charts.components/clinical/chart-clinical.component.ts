import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ChartPerformanceDataRetrieval } from '../../chart.performance.data.retrieval';
import { IChartProps } from '../../charts.models/IChartProps';

@Component({
  selector: 'app-chart-clinical',
  templateUrl: './chart-clinical.component.html',
  styleUrls: ['./chart-clinical.component.css']
})
export class ChartClinicalComponent implements OnInit {
  public clinicalMainChart: IChartProps = {};
  public trafficRadioGroup = new UntypedFormGroup({
    trafficRadio: new UntypedFormControl('Month')
  });
  setTrafficPeriod(value: string): void {
    this.trafficRadioGroup.setValue({ trafficRadio: value });
    this.initCharts();
  }
  constructor(private chartPerformanceDataRetrieval: ChartPerformanceDataRetrieval) { }

  ngOnInit(): void {
  }
  public initData(hapyyIndex: number[], nps: number[], average: number[]) {
    this.chartPerformanceDataRetrieval.initData(hapyyIndex, nps, average)
  }

  public initCharts(period: string = 'Month') {
    this.chartPerformanceDataRetrieval.initMainChart(period);
    this.clinicalMainChart = this.chartPerformanceDataRetrieval.initMainChart;
  }
}
