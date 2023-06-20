import { Component, Input } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { IChartProps } from '../../charts.models/IChartProps';
import { HospitalityChartAverageDataRetrieval } from './data.retrieval/chart.hospitality.average.data.retrieval';
import { HospitalityChartPerformanceDataRetrieval } from './data.retrieval/chart.clinical.performance.data.retrieval';


@Component({
  selector: 'chart-hospitality',
  templateUrl: './chart-hospitality.component.html',
  styleUrls: ['./chart-hospitality.component.scss']
})
export class ChartHospitalityComponent {
  public hospitalityPerformanceDataMainChart: IChartProps = {};
  public hospitalityAverageDataMainChart: IChartProps = {};
  @Input() loading: boolean;
  public trafficRadioGroup = new UntypedFormGroup({
    trafficRadio: new UntypedFormControl('Month')
  });
  setTrafficPeriod(value: string): void {
    this.trafficRadioGroup.setValue({ trafficRadio: value });
    console.log(value)
    this.initCharts(value);
  }
  constructor(private hospitalityChartPerformanceDataRetrieval: HospitalityChartPerformanceDataRetrieval,
    private hospitalityChartAverageDataRetrieval: HospitalityChartAverageDataRetrieval) { }


  public initData(hapyyIndex: number[], nps: number[], average: number[]) {
    this.hospitalityChartPerformanceDataRetrieval.initData(hapyyIndex, nps)
    this.hospitalityChartAverageDataRetrieval.initData(average)
  }

  public initCharts(period: string = 'Month') {
    this.hospitalityChartPerformanceDataRetrieval.initMainChart(period);
    this.hospitalityPerformanceDataMainChart = this.hospitalityChartPerformanceDataRetrieval.mainChart;

    this.hospitalityChartAverageDataRetrieval.initMainChart(period)
    this.hospitalityAverageDataMainChart = this.hospitalityChartAverageDataRetrieval.mainChart;
  }

}
