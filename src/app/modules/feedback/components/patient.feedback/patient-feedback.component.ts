import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PatientFeedback } from '../../models/patient.feedback';
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
  model: PatientFeedback;
  hospitalityToggle: any
  clinicalToggle: any
  feedbackForm: FormGroup
  isValidForm: boolean = false;
  constructor(private feedbackService: FeedbackService) { }
  currentPage: 'rating' | 'form' | 'thanks' = 'rating'; // Add 'thanks' page state
  selectedHospitalityEmoji: any = null;
  selectedClinicalEmoji: any = null;
  hospitalityEmojis = [
    { label: 'Good', image: 'assets/emojis/good.png' },
    { label: 'Bad', image: 'assets/emojis/bad.png' },
    { label: 'Terrible', image: 'assets/emojis/terrible.png' }
  ];

  clinicalEmojis = [
    { label: 'Good', image: 'assets/emojis/good.png' },
    { label: 'Bad', image: 'assets/emojis/bad.png' },
    { label: 'Terrible', image: 'assets/emojis/terrible.png' }
  ];

  ngOnInit(): void {
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
    } else {
      this.selectedClinicalEmoji = emoji;
    }

    if (this.bothSelected()) {
      setTimeout(() => {
        this.currentPage = 'form';
      }, 800);
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
    this.isClicked = true
    if (this.feedbackForm?.valid) {
      setTimeout(() => {
        this.currentPage = 'thanks'; // Switch to the thanks page after submitting
        this.isSubmitted = true;
      }, 800); // Simulate a small delay before transition
    } else {
      this.isValidForm = true;
    }
  }
}
