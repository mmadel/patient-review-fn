import { Component, Input } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ChartAverageDataRetrieval } from '../../chart.average.data.retrieval';
import { ChartPerformanceDataRetrieval } from '../../chart.performance.data.retrieval';
import { IChartProps } from '../../charts.models/IChartProps';

@Component({
  selector: 'chart-hospitality',
  templateUrl: './chart-hospitality.component.html',
  styleUrls: ['./chart-hospitality.component.css']
})
export class ChartHospitalityComponent {
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
  constructor(private chartPerformanceDataRetrieval: ChartPerformanceDataRetrieval,
    private chartAverageDataRetrieval: ChartAverageDataRetrieval) { }


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
