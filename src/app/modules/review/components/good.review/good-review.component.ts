import { Component, OnInit } from '@angular/core';
import { FeedBack } from '../../model/feedback';
import { CounterService } from '../../services/counter.service';

@Component({
  selector: 'app-good-review',
  templateUrl: './good-review.component.html',
  styleUrls: ['./good-review.component.css']
})
export class GoodReviewComponent implements OnInit {

  patientFeedBack: Map<string, boolean> = new Map<string, boolean>;
  isSubmitFeedback: boolean = false;
  constructor(private counterService: CounterService) { }

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
  submit() {
    var feedBack: FeedBack = JSON.parse(localStorage.getItem("feedback") || '{}');
    this.patientFeedBack.forEach((value: boolean, key: string) => {
      feedBack.items.push({
        name: key,
        itemValue: !value
      })
    });
    localStorage.setItem('feedback', JSON.stringify(feedBack))
    this.counterService.reviewCounter$.next(4);
  }
  onClickLeaveFeebback() {
    this.isSubmitFeedback = true;
  }
}
