import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import feedbackValues from '../../../models/data/feedback-data-stor';
import { ExcelReportCriteria } from '../../../models/report/excel.report.criteria';

@Component({
  selector: 'app-excel-report',
  templateUrl: './excel-report.component.html',
  styleUrls: ['./excel-report.component.css']
})
export class ExcelReportComponent implements OnInit {
  searchInputNotValid: boolean = false;
  errorMsg: string;
  reportCriteria: ExcelReportCriteria = new ExcelReportCriteria();
  feedbackValues = feedbackValues;
  public customRanges = {
    Today: [new Date(), new Date()],
    Yesterday: [
      new Date(new Date().setDate(new Date().getDate() - 1)),
      new Date(new Date().setDate(new Date().getDate() - 1))
    ],
    'Last 7 Days': [
      new Date(new Date().setDate(new Date().getDate() - 6)),
      new Date(new Date())
    ],
    'Last 30 Days': [
      new Date(new Date().setDate(new Date().getDate() - 29)),
      new Date(new Date())
    ],
    'This Month': [
      new Date(new Date().setDate(1)),
      new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
    ],
    'Last Month': [
      new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
      new Date(new Date().getFullYear(), new Date().getMonth(), 0)
    ]
  };
  constructor() { }

  ngOnInit(): void {
  }
  search() {
    this.formatDate();
  }
  private formatDate() {
    
    if (this.reportCriteria.startDate_date !== undefined)
      this.reportCriteria.startDate = this.reportCriteria.startDate_date ? moment(new Date(this.reportCriteria.startDate_date)).startOf('day').valueOf() : 0;
    if (this.reportCriteria.endDate_date !== undefined)
      this.reportCriteria.endDate = this.reportCriteria.endDate_date ? moment(new Date(this.reportCriteria.endDate_date)).endOf('day').valueOf() : 0;
  }
  private export(){
    
  }
}
