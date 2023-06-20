import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { PerformanceIndexService } from '../../services/performance/performance-index.service';
import { TimeUtil } from '../../utils/time.uti';
import { ChartClinicalComponent } from './charts/charts.components/clinical/chart-clinical.component';
import { ChartHospitalityComponent } from './charts/charts.components/hospitality/chart-hospitality.component';
@Component({
  selector: 'app-dashboard-feedback',
  templateUrl: './dashboard-feedback.component.html',
  styleUrls: ['./dashboard-feedback.component.scss']
})
export class DashboardFeedbackComponent implements OnInit {
  @ViewChild(ChartHospitalityComponent) chartHospitalityComponent: ChartHospitalityComponent;
  @ViewChild(ChartClinicalComponent) chartClinicalComponent: ChartClinicalComponent;
  hLoading: boolean = false;
  cLoading = false;
  constructor(private performanceIndexService: PerformanceIndexService) { }

  ngOnInit(): void {

    this.getHospitalityPerfromanceData();
    this.getClinicalPerfromanceData();

  }
  public hospitalityTrafficRadioGroup = new UntypedFormGroup({
    trafficRadio: new UntypedFormControl('Month')
  });
  public clinicaltrafficRadioGroup = new UntypedFormGroup({
    trafficRadio: new UntypedFormControl('Month')
  });
  setHospitalityTrafficPeriod(value: string): void {
    this.hospitalityTrafficRadioGroup.setValue({ trafficRadio: value });
    this.getHospitalityPerfromanceData(value)
  }
  setClinicalTrafficPeriod(value: string): void {
    this.clinicaltrafficRadioGroup.setValue({ trafficRadio: value });
    this.getClinicalPerfromanceData(value)
  }
  getHospitalityPerfromanceData(period: string = 'Month') {
    var dateRange: number[] = TimeUtil.getDateRangePerTimeUnit(period);
    this.performanceIndexService.getChartData(1, dateRange[0], dateRange[1], period)
      .subscribe((result) => {
        this.hLoading = true;
        this.chartHospitalityComponent.initData(result.hospitalityChartData[0], result.hospitalityChartData[1], result.hospitalityChartData[2])
        this.chartHospitalityComponent.initCharts(period);
      })
  }

  getClinicalPerfromanceData(period: string = 'Month') {
    this.performanceIndexService.getChartData(1, 1685566800000, 1688158799000, 'Month')
      .subscribe((result) => {
        this.cLoading = true;

        this.chartClinicalComponent.initData(result.clinicalChartData[0], result.clinicalChartData[1], result.clinicalChartData[2])
        this.chartClinicalComponent.initCharts(period);
      })
  }
}
