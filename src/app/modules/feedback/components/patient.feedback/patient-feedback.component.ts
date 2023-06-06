import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PatientFeedback } from '../../models/patient.feedback';
import { FeedbackService } from '../../services/feedback.service';

@Component({
  selector: 'app-patient-feedback',
  templateUrl: './patient-feedback.component.html',
  styleUrls: ['./patient-feedback.component.css']
})
export class PatientFeedbackComponent implements OnInit {
  isSubmitted: boolean = false;
  model: PatientFeedback = {
    clinicId: 0,
    feedbackQuestions: {
      hospitalityFeedback: '',
      clinicalFeedback: ''
    },
    patientName: '',
  }
  hospitalityToggle: any = {
    VGood: false,
    Good: false,
    VSad: false,
    Sad: false
  }
  clinicalToggle: any = {
    VGood: false,
    Good: false,
    VSad: false,
    Sad: false
  }

  constructor(private feedbackService: FeedbackService,
    private spinner: NgxSpinnerService,
    private router: Router) { }

  ngOnInit(): void {
    this.isSubmitted = false;
  }
  submit() {
    this.populateModel();
    this.spinner.show();
    this.feedbackService.submit(this.model).subscribe((response) => {
      this.isSubmitted = true;
      this.spinner.hide();
    })
  }
  back() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/feedback/submit']).then(() => {
        console.log(`After navigation I am on:${this.router.url}`)
      })
    })
  }
  public selectFeedback(event: any) {
    var controlName: string[] = event.target.name.split("-", 2);
    var feedbackFeeling = controlName[1];
    var entityContainer: any = controlName[0] === 'hospitality' ? this.hospitalityToggle : this.clinicalToggle;
    switch (feedbackFeeling) {
      case "VeryGood":
        entityContainer.VGood = true;
        entityContainer.Good = false, entityContainer.VSad = false, entityContainer.Sad = false
        break;
      case "Happy":
        entityContainer.Good = true;
        entityContainer.VGood = false, entityContainer.VSad = false, entityContainer.Sad = false
        break;
      case "Meh":
        entityContainer.Sad = true;
        entityContainer.VGood = false, entityContainer.Good = false, entityContainer.VSad = false
        break;
      case "Frown":
        entityContainer.VSad = true;
        entityContainer.VGood = false, entityContainer.Good = false, entityContainer.Sad = false
        break;
    }
  }

  private populateModel() {
    let hospitalityValue: string = '';
    let clinicalValue: string = '';
    this.model.clinicId = 1;
    Object.keys(this.hospitalityToggle).forEach((key, index) => {
      if (this.hospitalityToggle[key]) {
        hospitalityValue = key;
        return;
      }
    });
    Object.keys(this.clinicalToggle).forEach((key, index) => {
      if (this.clinicalToggle[key]) {
        clinicalValue = key;
        return;
      }
    });
    console.log(hospitalityValue)
    this.model.feedbackQuestions={
      hospitalityFeedback :hospitalityValue,
      clinicalFeedback:clinicalValue

    }
  }
}

