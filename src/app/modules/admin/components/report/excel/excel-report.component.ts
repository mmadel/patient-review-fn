import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';
import { filter } from 'rxjs';
import { Clinic } from '../../../models/clinic.model';
import feedbackValues from '../../../models/data/feedback-data-stor';
import ServiceName from '../../../models/data/service-data.store';
import { ExcelReportCriteria } from '../../../models/report/excel.report.criteria';
import { ClinicService } from '../../../services/clinic/clinic.service';
import { ExcelReportService } from '../../../services/report/excel-report.service';

@Component({
  selector: 'app-excel-report',
  templateUrl: './excel-report.component.html',
  styleUrls: ['./excel-report.component.css']
})
export class ExcelReportComponent implements OnInit {
  searchInputNotValid: boolean = false;
  errorMsg: string = "";
  reportCriteria: ExcelReportCriteria = new ExcelReportCriteria();
  feedbackValues = feedbackValues;
  serviceNames = ServiceName;
  userClinics: Clinic[] | null;
  selectedClinic: Clinic | null
  selectedClinicsIds: string[] | null;
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
  constructor(private excelReportService: ExcelReportService, private clinicService: ClinicService) { }

  ngOnInit(): void {
    this.reportCriteria.timeZone = "America/New_York"
    this.clinicService.selectedClinic$.pipe(
      filter(clinic => clinic !== null)
    ).subscribe(clinic => {
      this.selectedClinic = clinic;
    })
    this.clinicService.userClinics$.pipe(
      filter(clinics => clinics != null)
    ).subscribe((result) => {
      this.userClinics = result;
    })
  }
  export() {
    this.formatDate();
    this.callExportService();
  }
  private formatDate() {
    var offset: number = new Date().getTimezoneOffset() / 60;
    if (offset > 0)
      offset = offset * -1;
    if (this.reportCriteria.startDate_date !== undefined)
      this.reportCriteria.startDate = this.reportCriteria.startDate_date ? moment(this.reportCriteria.startDate_date).utcOffset(offset, true).startOf('day').valueOf() : 0;
    if (this.reportCriteria.endDate_date !== undefined)
      this.reportCriteria.endDate = this.reportCriteria.endDate_date ? moment(this.reportCriteria.endDate_date).utcOffset(offset, true).endOf('day').valueOf() : 0;
  }
  private callExportService() {
    const filteredClinics: Clinic[] | undefined = this.userClinics?.filter(obj => this.selectedClinicsIds?.includes(obj.id + ''));
    this.reportCriteria.clinics = filteredClinics;
    this.excelReportService.export(this.reportCriteria).subscribe(
      (response) => {
        const a = document.createElement('a')
        const objectUrl = URL.createObjectURL(response)
        a.href = objectUrl
        var nameDatePart = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        a.download = 'feedback-' + nameDatePart + '.xlsx';
        a.click();
        URL.revokeObjectURL(objectUrl);
        this.errorMsg = ""
      },
      (error) => {
        this.errorMsg = "The inputs data returns empty result for selected clinic"
      });
  }
  public isValidInputs(): boolean {
    var selectedClinics = this.selectedClinicsIds === undefined || this.selectedClinicsIds!.length === 0;
    var checkFeedbackList = this.reportCriteria.feedbackFilter === undefined || this.reportCriteria.feedbackFilter.length === 0;
    var checkDateRange = this.reportCriteria.startDate_date === undefined || this.reportCriteria.endDate_date === undefined;
    var result: boolean = (this.reportCriteria.serviceName === undefined || this.reportCriteria.serviceName.length < 0) || checkFeedbackList || checkDateRange || selectedClinics ? true : false
    return result;

  }
}
