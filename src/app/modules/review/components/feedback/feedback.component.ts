import { Component, OnInit } from '@angular/core';
import { FeedBack } from '../../model/feedback';
import { CounterService } from '../../services/counter.service';

@Component({
  selector: 'app-feedback-review',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  patientFeedBack: Map<string, boolean> = new Map<string, boolean>;
  feedBack: FeedBack = {
    id: null,
    feedbackValue: '',
    clinicId: 0,
    items: [],
    optionalFeedback: null
  }
  constructor(private counterService: CounterService) { }

  ngOnInit(): void {
  }
  next(event: any) {
    var name: string = event.target.name;
    this.counterService.reviewCounter$.next(2);

    this.feedBack.feedbackValue = name;
    this.fillFeedbackItems();
    localStorage.setItem("feedback", JSON.stringify(this.feedBack))
  }

  fillFeedbackItems() {
    this.patientFeedBack.set('customer_service', false);
    this.patientFeedBack.set('price', false);
    this.patientFeedBack.set('product_selection', false);
    this.patientFeedBack.set('queue_time', false);
    this.patientFeedBack.set('staff_availability', false);
    this.patientFeedBack.set('something_else', false);
    this.patientFeedBack.forEach((value: boolean, key: string) => {
      this.feedBack.items.push({
        name: key,
        itemValue: value
      })
    });
  }
}
