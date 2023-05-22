import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-submit-review',
  templateUrl: './submit-review.component.html',
  styleUrls: ['./submit-review.component.css']
})
export class SubmitReviewComponent implements OnInit {
  isSubmitFeedback: boolean = false;
  hasFeebback: boolean = false;
  @ViewChild('userCreateForm')
  userCreateForm!: NgForm;
  constructor() { }

  ngOnInit(): void {
  }

  onClickLeaveFeebback() {
    this.hasFeebback = true;
  }
  create() {
    this.isSubmitFeedback = true;
  }
}
