import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs';
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
  //public baseURL: string = location.origin;
  public baseURL: string = '192.168.1.69:4200'
  constructor(private clinicService: ClinicService) { }

  ngOnInit(): void {
    this.clinicService.selectedClinic$.pipe(
      filter(result => result !== null)
    ).subscribe((clinic) => {
      this.clinicName = clinic!.name;
      this.clinicId = clinic!.id
      this.createFeedbackURL = this.baseURL + '/#/feedback/submit?clinicId=' + clinic?.id;
    })
  }
}
