import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { PerformanceIndexService } from 'src/app/modules/admin/services/performance/performance-index.service';
import { ChartPerformanceDataRetrieval } from '../../chart.performance.data.retrieval';
import { IChartProps } from '../../charts.models/IChartProps';

@Component({
  selector: 'chart-hospitality',
  templateUrl: './chart-hospitality.component.html',
  styleUrls: ['./chart-hospitality.component.css']
})
export class ChartHospitalityComponent implements OnInit {
  public hospitalityMainChart: IChartProps = {};
  loading: boolean = false;
  public trafficRadioGroup = new UntypedFormGroup({
    trafficRadio: new UntypedFormControl('Month')
  });
  setTrafficPeriod(value: string): void {
    this.trafficRadioGroup.setValue({ trafficRadio: value });
    this.initCharts();
  }
  constructor(private chartPerformanceDataRetrieval: ChartPerformanceDataRetrieval,
    private performanceIndexService: PerformanceIndexService) { }

  ngOnInit(): void {
    this.performanceIndexService.getChartData(1, 1685566800000, 1688158799000, 'Month')
      .subscribe((result) => {
        this.loading = true;
        this.initData(result.hospitalityChartData[0], result.hospitalityChartData[1], result.hospitalityChartData[2])
        this.initCharts();
      })
  }

  public initData(hapyyIndex: number[], nps: number[], average: number[]) {
    this.chartPerformanceDataRetrieval.initData(hapyyIndex, nps, average)
  }

  public initCharts(period: string = 'Month') {
    console.log('initCharts')
    this.chartPerformanceDataRetrieval.initMainChart(period);
    this.hospitalityMainChart = this.chartPerformanceDataRetrieval.mainChart;
  }

}
