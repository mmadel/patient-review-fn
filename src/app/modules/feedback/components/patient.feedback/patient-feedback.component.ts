import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { EncryptionService } from 'src/app/util/encryption/encryption.service';
import { PatientFeedback } from '../../models/patient.feedback';
import { PateintFeedbackQuestion } from '../../models/patient.feedback.question';
import { FeedbackService } from '../../services/feedback.service';
@Component({
  selector: 'app-patient-feedback',
  templateUrl: './patient-feedback.component.html',
  styleUrls: ['./patient-feedback.component.css'],
  animations: [
    // Fade in animation
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 }))
      ])
    ]),
    // Slide in animation
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('400ms ease-out', style({ transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        animate('400ms ease-in', style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ]
})
export class PatientFeedbackComponent implements OnInit {
  @ViewChild('search') search: ElementRef;
  isClicked: boolean = false;
  isSubmitted: boolean = false;;
  isClinicIdEmpty: boolean = false;
  clinicId: number;
  model: PatientFeedback = {
    clinicId: 0,
    feedbackQuestions: null,
    patientName: '',
    firstName: '',
    lastName: ''
  };
  hospitalityToggle: any
  clinicalToggle: any
  feedbackForm: FormGroup
  isValidForm: boolean = false;
  constructor(private feedbackService: FeedbackService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private route: ActivatedRoute,
    private encryptionService: EncryptionService) { }
  currentPage: 'rating' | 'form' | 'thanks' = 'rating'; // Add 'thanks' page state
  selectedHospitalityEmoji: any = null;
  selectedClinicalEmoji: any = null;
  hospitalityEmojis = [
    { label: 'Excellent', image: 'assets/emojis/good.png' },
    { label: 'Average', image: 'assets/emojis/bad.png' },
    { label: 'Needs Improvement', image: 'assets/emojis/terrible.png' }
  ];

  clinicalEmojis = [
    { label: 'Excellent', image: 'assets/emojis/good.png' },
    { label: 'Average', image: 'assets/emojis/bad.png' },
    { label: 'Needs Improvement', image: 'assets/emojis/terrible.png' }
  ];

  ngOnInit(): void {
    this.getclinicId()
    this.feedbackForm = new FormGroup({
      'firstName': new FormControl(null, [Validators.required]),
      'lastName': new FormControl(null, [Validators.required]),
      'comments': new FormControl(null),
    })
  }
  bothSelected(): boolean {
    return !!this.selectedHospitalityEmoji && !!this.selectedClinicalEmoji;
  }
  selectEmoji(serviceType: string, emoji: any) {
    if (serviceType === 'hospitality') {
      this.selectedHospitalityEmoji = emoji;
      setTimeout(() => {
        const formElement = document.getElementById('clinicalService');
        if (formElement) {
          formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100); // Small delay to ensure U I updates
    } else {
      this.selectedClinicalEmoji = emoji;
    }

    if (this.bothSelected()) {
      setTimeout(() => {
        const formElement = document.getElementById('feedbackForm');
        if (formElement) {
          formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100); // Small delay to ensure UI updates
    }
  }
  goBack() {
    this.currentPage = 'rating';
    // Reset the selected emojis
    if (this.isSubmitted) {
      this.selectedHospitalityEmoji = null;
      this.selectedClinicalEmoji = null;
      this.isSubmitted = false;
    }
  }

  submitFeedback() {
    this.fillModel()
    this.isClicked = true
    if (this.feedbackForm?.valid && this.bothSelected()) {
      this.spinner.show();
      this.feedbackService.submit(this.model).subscribe(rr => {
        this.feedbackForm.reset();
        this.isClicked = false
        this.spinner.hide();
        setTimeout(() => {
          this.currentPage = 'thanks';
          this.isSubmitted = true;
        }, 800);
      })
    } else {
      this.isValidForm = true;
    }
  }
  private fillModel() {
    this.model.feedbackQuestions = this.fillReaction();
    this.model.optionalFeedback = this.feedbackForm.get('comments')?.value
    this.model.clinicId = this.clinicId
    this.model.firstName = this.feedbackForm.get('firstName')?.value;
    this.model.lastName = this.feedbackForm.get('lastName')?.value
  }
  private fillReaction(): PateintFeedbackQuestion {
    let hospitalityFeedback: string = '';
    let clinicalFeedback: string = '';
    if (this.selectedHospitalityEmoji.label === 'Excellent')
      hospitalityFeedback = 'VGood'
    if (this.selectedHospitalityEmoji.label === 'Average')
      hospitalityFeedback = 'Good'
    if (this.selectedHospitalityEmoji.label === 'Needs Improvement')
      hospitalityFeedback = 'Sad'

    if (this.selectedClinicalEmoji.label === 'Excellent')
      clinicalFeedback = 'VGood'
    if (this.selectedClinicalEmoji.label === 'Average')
      clinicalFeedback = 'Good'
    if (this.selectedClinicalEmoji.label === 'Needs Improvement')
      clinicalFeedback = 'Sad'
    return {
      hospitalityFeedback: hospitalityFeedback,
      clinicalFeedback: clinicalFeedback
    }
  }
  private getclinicId() {
    var cachedClinicId = localStorage.getItem('clinicId')
    if (cachedClinicId === null) {
      this.clinicId = Number(this.route.snapshot.queryParamMap.get('clinicId'));
      var encryptClinicId = this.encryptionService.encrypt((this.clinicId).toString())
      localStorage.setItem('clinicId', encryptClinicId)
    } else {
      this.clinicId = Number(this.encryptionService.decrypt(cachedClinicId));
      console.log(this.clinicId)
    }
    this.router.navigate([], {
      queryParams: {
        'clinicId': null,
      },
      queryParamsHandling: 'merge'
    })
    console.log(this.clinicId + ' Clinic-ID')
  }
}
