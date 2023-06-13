import { Component, OnInit } from '@angular/core';
import { combineLatest, filter, tap } from 'rxjs';
import { ClinicService } from '../../services/clinic/clinic.service';
@Component({
  selector: 'app-dashboard-feedback',
  templateUrl: './dashboard-feedback.component.html',
  styleUrls: ['./dashboard-feedback.component.scss']
})
export class DashboardFeedbackComponent implements OnInit {
  constructor(private clinicService: ClinicService) { }

  ngOnInit(): void {
    combineLatest([this.clinicService.selectedClinic$, this.clinicService.filterDate$])
      .pipe(
        tap((result) => console.log(result[0])),
        filter((result) => result[0] !== null),
      ).subscribe(resut => {
        console.log('result ' + resut);
      })
  }

}
