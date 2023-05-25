import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-feedback',
  templateUrl: './patient-feedback.component.html',
  styleUrls: ['./patient-feedback.component.css']
})
export class PatientFeedbackComponent implements OnInit {
  hospitalityToggle: any = {
    vgood: false,
    good: false,
    vsad: false,
    sad: false
  }
  clinicalToggle: any = {
    vgood: false,
    good: false,
    vsad: false,
    sad: false
  }

  constructor() { }

  ngOnInit(): void {
  }
  submit() {

  }

  public selectFeedback(event: any) {
    var controlName: string[] = event.target.name.split("-", 2);    
    var feedbackFeeling = controlName[1];
    var entityContainer: any = controlName[0] === 'hospitality' ? this.hospitalityToggle : this.clinicalToggle;
    console.log(feedbackFeeling)
    switch (feedbackFeeling) {
      case "VeryGood":
        entityContainer.vgood = true;
        entityContainer.good = false, entityContainer.vsad = false, entityContainer.sad = false
        break;
      case "Happy":
        entityContainer.good = true;
        entityContainer.vgood = false, entityContainer.vsad = false, entityContainer.sad = false
        break;
      case "Meh":
        entityContainer.sad = true;
        entityContainer.vgood = false, entityContainer.good = false, entityContainer.vsad = false
        break;
      case "Frown":
        entityContainer.vsad = true;
        entityContainer.vgood = false, entityContainer.good = false, entityContainer.sad = false
        break;
    }
  }

}
