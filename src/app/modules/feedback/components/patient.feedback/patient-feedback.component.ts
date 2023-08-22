import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import NoSleep from 'nosleep.js';
import { PatientFeedback } from '../../models/patient.feedback';
import { FeedbackService } from '../../services/feedback.service';

@Component({
  selector: 'app-patient-feedback',
  templateUrl: './patient-feedback.component.html',
  styleUrls: ['./patient-feedback.component.css']
})
export class PatientFeedbackComponent implements OnInit {
  @ViewChild('search') search: ElementRef;
  isSubmitted: boolean = false;
  isClinicIdEmpty: boolean = false;
  clinicId: number;
  model: PatientFeedback;
  hospitalityToggle: any
  clinicalToggle: any

  constructor(private feedbackService: FeedbackService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    
    window.addEventListener("keyup", disableF5);
    window.addEventListener("keydown", disableF5);

    function disableF5(e: any) {
      if ((e.which || e.keyCode) == 116) e.preventDefault();
    };
    this.isSubmitted = false;
    this.clinicId = Number(this.route.snapshot.queryParamMap.get('clinicId'));
    this.initModel()
    if (this.clinicId === 0 || this.clinicId === undefined || this.clinicId === null) {
      this.isClinicIdEmpty = true;
    } else {
      this.router.navigate([], {
        queryParams: {
          'clinicId': null,
        },
        queryParamsHandling: 'merge'
      })
    }
    document.getElementById("no_sleep_input")?.click();
  }
  checkFields(): boolean {
    var hospitalityValue: string = '';
    var clinicalValue: string = '';
    Object.keys(this.hospitalityToggle).forEach((key, index) => {
      if (this.hospitalityToggle[key]) {
        hospitalityValue = this.hospitalityToggle[key];
        return;
      }
    });
    Object.keys(this.clinicalToggle).forEach((key, index) => {
      if (this.clinicalToggle[key]) {
        clinicalValue = this.clinicalToggle[key];
        return;
      }
    });  
    var result: boolean = this.model.patientName == "" || (!hospitalityValue || !clinicalValue);
    return result;
  }
  submit() {
    this.populateModel();
    this.spinner.show();
    this.feedbackService.submit(this.model).subscribe((response) => {
      this.isSubmitted = true;
      this.spinner.hide();
      setTimeout(() => {
        //window.location.reload()
        this.router.navigateByUrl('feedback/submit', { skipLocationChange: true }).then(() => {
          this.router.navigate(['feedback/submit'], { queryParams: { clinicId: this.clinicId } }).then(() => {
            this.ngOnInit()
          })
        })
      }, 5000);  //5s
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
    this.model.clinicId = this.clinicId;
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
    this.model.feedbackQuestions = {
      hospitalityFeedback: hospitalityValue,
      clinicalFeedback: clinicalValue

    }
  }
  private initModel() {
    var model: PatientFeedback = {
      clinicId: 0,
      feedbackQuestions: {
        hospitalityFeedback: '',
        clinicalFeedback: ''
      },
      patientName: '',
    }
    this.model = model;
    var hospitalityToggle: any = {
      VGood: false,
      Good: false,
      VSad: false,
      Sad: false
    }
    this.hospitalityToggle = hospitalityToggle
    var clinicalToggle: any = {
      VGood: false,
      Good: false,
      VSad: false,
      Sad: false
    }
    this.clinicalToggle = clinicalToggle;
  }
  handleNoSleep(){
    console.log('clickeed')
    var noSleep = new NoSleep();
    document.addEventListener('click', function enableNoSleep() {
      document.removeEventListener('click', enableNoSleep, false);
      noSleep.enable();
    }, false);
  }
}
