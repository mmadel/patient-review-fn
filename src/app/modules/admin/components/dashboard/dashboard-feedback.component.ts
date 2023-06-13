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
  constructor() { }

  ngOnInit(): void {

  }
  initCharts(): void {

  }

}
