import { Component, Input } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ChartPerformanceDataRetrieval } from '../../chart.performance.data.retrieval';
import { IChartProps } from '../../charts.models/IChartProps';

@Component({
  selector: 'chart-hospitality',
  templateUrl: './chart-hospitality.component.html',
  styleUrls: ['./chart-hospitality.component.css']
})
export class ChartHospitalityComponent {
  public hospitalityMainChart: IChartProps = {};
  @Input() loading: boolean;
  public trafficRadioGroup = new UntypedFormGroup({
    trafficRadio: new UntypedFormControl('Month')
  });
  setTrafficPeriod(value: string): void {
    this.trafficRadioGroup.setValue({ trafficRadio: value });
    this.initCharts();
  }
  constructor(private chartPerformanceDataRetrieval: ChartPerformanceDataRetrieval) { }


  public initData(hapyyIndex: number[], nps: number[], average: number[]) {
    this.chartPerformanceDataRetrieval.initData(hapyyIndex, nps, average)
  }

  public initCharts(period: string = 'Month') {
    this.chartPerformanceDataRetrieval.initMainChart(period);
    this.hospitalityMainChart = this.chartPerformanceDataRetrieval.mainChart;
  }

}
