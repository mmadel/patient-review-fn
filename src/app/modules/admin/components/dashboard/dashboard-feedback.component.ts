import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import * as moment from 'moment';
import { FeedbackNumbers } from '../../models/feedback.numbers';
import { DashboardFeedbackService } from '../../services/dashboard-feedback.service';
import { DashboardChartsData, IChartProps } from './dashboard-charts-data';
@Component({
  selector: 'app-dashboard-feedback',
  templateUrl: './dashboard-feedback.component.html',
  styleUrls: ['./dashboard-feedback.component.scss']
})
export class DashboardFeedbackComponent implements OnInit {
  public trafficRadioGroup = new UntypedFormGroup({
    trafficRadio: new UntypedFormControl('Month')
  });
  public mainChart: IChartProps = {};
  feedbackNumbers: FeedbackNumbers = {
    total: 0,
    goodFeedbackTotal: 0,
    sadFeedbackTotal: 0,
    vgoodFeedbackTotal: 0,
    vsadFeedbackTotal: 0,
    vgoodFeedbackPercentage: 0,
    goodFeedbackPercentage: 0,
    vsadFeedbackPercentage: 0,
    sadFeedbackPercentage: 0
  }
  constructor(private chartsData: DashboardChartsData
    , private dashboardFeedbackService: DashboardFeedbackService) { }

  ngOnInit(): void {
    var startDate = moment(new Date()).startOf('day').valueOf();
    var endDate = moment(new Date()).endOf('day').valueOf();
    this.dashboardFeedbackService.getFeedbackNumbers(startDate, endDate).subscribe((response) => {
      if (response.body !== null)
        this.feedbackNumbers = response.body;
        console.log(JSON.stringify(this.feedbackNumbers))
    })
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
