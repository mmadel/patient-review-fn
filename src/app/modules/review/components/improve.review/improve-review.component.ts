import { Component, OnInit } from '@angular/core';
import { PatientFeedBack } from '../../model/patient.feedback';
import { CounterService } from '../../services/counter.service';

@Component({
  selector: 'app-improve-review',
  templateUrl: './improve-review.component.html',
  styleUrls: ['./improve-review.component.css']
})
export class ImproveReviewComponent implements OnInit {
  patientFeedBack: Map<string, boolean> = new Map<string, boolean>;
  constructor(private counterService:CounterService) { }

  ngOnInit(): void {
    this.patientFeedBack.set('customer_service', false);
    this.patientFeedBack.set('price', false);
    this.patientFeedBack.set('product_selection', false);
    this.patientFeedBack.set('queue_time', false);
    this.patientFeedBack.set('staff_availability', false);
    this.patientFeedBack.set('something_else', false);
  }
  enableDisableRule(event: any) {
    var feedBackName: string = event.target.name;
    var feedBackValue: boolean | undefined = this.patientFeedBack.get(feedBackName);
    this.patientFeedBack.set(feedBackName, !feedBackValue)
  }
  submit(){
    this.counterService.reviewCounter$.next(4);
  }
}
