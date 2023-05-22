import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { PatientFeedBack } from '../../model/patient.feedback';

@Component({
  selector: 'app-good-review',
  templateUrl: './good-review.component.html',
  styleUrls: ['./good-review.component.css']
})
export class GoodReviewComponent implements OnInit {
  customerServiceToggle = false;
  priceToggle = false;
  productSelectionToggle = false;
  queueTimeToggle = false;
  staffAvailabilityToggle = false;
  somethingElseToggle = false;

  enableDisableRule(event: any) {
    var name = event.target.name;
    if (name === 'customer_service')
      this.customerServiceToggle = !this.customerServiceToggle;
    if (name === 'price')
      this.priceToggle = !this.priceToggle;
    if (name === 'queue_time')
      this.queueTimeToggle = !this.queueTimeToggle;
    if (name === 'staff_availability')
      this.staffAvailabilityToggle = !this.staffAvailabilityToggle;
    if (name === 'something_else')
      this.somethingElseToggle = !this.somethingElseToggle;
  }
  constructor() { }

  ngOnInit(): void {

  }

}
