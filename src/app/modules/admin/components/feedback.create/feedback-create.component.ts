import { Component, OnInit } from '@angular/core';
import { ClinicService } from '../../services/clinic/clinic.service';

@Component({
  selector: 'app-feedback-create',
  templateUrl: './feedback-create.component.html',
  styleUrls: ['./feedback-create.component.css']
})
export class FeedbackCreateComponent implements OnInit {
  public createFeedbackURL: string
  public clinicId: number | null;
  public clinicName: string | null;
  public baseURL: string = location.origin;
  constructor(private clinicService: ClinicService) { }

  ngOnInit(): void {

    if (localStorage.getItem('userRole') === 'USER')
      this.observeNormalUser()
    else
      this.observeNormalAdmin()
  }
  observeNormalUser() {
    this.clinicService.selectedClinicNormal$.subscribe(clinicId => {
      this.clinicService.selectedClinicNameNormal$.subscribe(name => {
        this.clinicName = name;
        this.clinicId = clinicId
        this.createFeedbackURL = this.baseURL + '/#/feedback/submit?clinicId=' + clinicId;
      });

    })
  }
  observeNormalAdmin() {
    this.clinicService.selectedClinic$.subscribe(clinicId => {
      this.clinicService.selectedClinicName$.subscribe(name => {
        this.clinicName = name;
        this.clinicId = clinicId
        this.createFeedbackURL = this.baseURL + '/#/feedback/submit?clinicId=' + clinicId;
      });

    })
  }
}
