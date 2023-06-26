import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { IChartProps } from '../../charts.models/IChartProps';
import { ClinicalChartAverageDataRetrieval } from './data.retrieval/chart.clinical.average.data.retrieval';
import { ClinicalChartPerformanceDataRetrieval } from './data.retrieval/chart.clinical.performance.data.retrieval';

@Component({
  selector: 'chart-clinical',
  templateUrl: './chart-clinical.component.html',
  styleUrls: ['./chart-clinical.component.css']
})
export class ChartClinicalComponent implements OnInit {
  public performanceDataMainChart: IChartProps = {};
  public averageDataMainChart: IChartProps = {};

  @Input() loading: boolean;

  public trafficRadioGroup = new UntypedFormGroup({
    trafficRadio: new UntypedFormControl('Month')
  });
  setTrafficPeriod(value: string): void {
    this.trafficRadioGroup.setValue({ trafficRadio: value });
    this.initCharts();
  }
  constructor(private chartPerformanceDataRetrieval: ClinicalChartPerformanceDataRetrieval,
    private chartAverageDataRetrieval: ClinicalChartAverageDataRetrieval) { }

  ngOnInit(): void {
  }
  public initData(hapyyIndex: number[], nps: number[], average: number[]) {
    this.chartPerformanceDataRetrieval.initData(hapyyIndex, nps)
    this.chartAverageDataRetrieval.initData(average)
  }

  public initCharts(period: string = 'Month') {
    this.chartPerformanceDataRetrieval.initMainChart(period);
    this.performanceDataMainChart = this.chartPerformanceDataRetrieval.mainChart;

    this.chartAverageDataRetrieval.initMainChart(period)
    this.averageDataMainChart = this.chartAverageDataRetrieval.mainChart;
  }
}
