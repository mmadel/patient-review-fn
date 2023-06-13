import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import * as moment from 'moment';
import { filter, tap } from 'rxjs';
import { FeedbackNumbers } from '../../models/feedback.numbers';
import { ClinicService } from '../../services/clinic/clinic.service';
import { DashboardFeedbackService } from '../../services/dashboard-feedback.service';
import { DashboardChartsData, IChartProps } from './dashboard-charts-data';
@Component({
  selector: 'app-dashboard-feedback',
  templateUrl: './dashboard-feedback.component.html',
  styleUrls: ['./dashboard-feedback.component.scss']
})
export class DashboardFeedbackComponent implements OnInit {
  constructor(private clinicService: ClinicService) { }

  ngOnInit(): void {
    this.clinicService.selectedClinic$
    .pipe(
      filter((result) => result !== null),
    ).subscribe(clinicId=>{
      console.log('emitted clinic-id ' +clinicId);
    })
  }

}
