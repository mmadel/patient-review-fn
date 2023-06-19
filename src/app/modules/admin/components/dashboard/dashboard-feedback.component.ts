import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-dashboard-feedback',
  templateUrl: './dashboard-feedback.component.html',
  styleUrls: ['./dashboard-feedback.component.scss']
})
export class DashboardFeedbackComponent implements OnInit {

  loading: boolean = false;

  constructor() { }

  ngOnInit(): void {

    this.initCharts();

  }
  initCharts(): void {
  }

}
