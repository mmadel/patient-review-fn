import { Component, OnInit, ViewChild } from '@angular/core';
import { PerformanceIndexService } from '../../services/performance/performance-index.service';
import { ChartHospitalityComponent } from './charts/charts.components/hospitality/chart-hospitality.component';
@Component({
  selector: 'app-dashboard-feedback',
  templateUrl: './dashboard-feedback.component.html',
  styleUrls: ['./dashboard-feedback.component.scss']
})
export class DashboardFeedbackComponent implements OnInit {
  @ViewChild(ChartHospitalityComponent) chartHospitalityComponent: ChartHospitalityComponent;
  loading: boolean = false;

  constructor(private performanceIndexService:PerformanceIndexService) { }

  ngOnInit(): void {
    this.performanceIndexService.getChartData(1, 1685566800000, 1688158799000, 'Month')
    .subscribe((result) => {
      this.loading = true;
      this.chartHospitalityComponent.initData(result.hospitalityChartData[0], result.hospitalityChartData[1], result.hospitalityChartData[2])
      this.chartHospitalityComponent.initCharts();
    })

  }

}
