import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FeedBack } from '../../model/feedback';
import { FeedbackItem } from '../../model/feedback.item';
import { CounterService } from '../../services/counter.service';
import { SubmitFeedbackService } from '../../services/submit-feedback.service';

@Component({
  selector: 'app-feedback-items',
  templateUrl: './feedback-items.component.html',
  styleUrls: ['./feedback-items.component.css']
})
export class FeedbackItemsComponent implements OnInit {

  patientFeedBack: Map<string, boolean> = new Map<string, boolean>;
  feedBack: FeedBack = JSON.parse(localStorage.getItem("feedback") || '{}');
  isSubmitFeedback: boolean = false;
  feeling: boolean = true;
  constructor(private counterService: CounterService,
    private submitFeedbackService: SubmitFeedbackService
    , private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getFeedbackFeeling(this.feedBack.feedbackValue);
  }
  enableDisableRule(event: any) {
    var feedBackName: string = event.target.name;
    var feedBackValue: boolean | undefined = this.feedBack.items.find(item => item.name === feedBackName)?.itemValue;
    this.patientFeedBack.set(feedBackName, !feedBackValue)

    if (feedBackName !== undefined && feedBackValue !== undefined) {
      this.updateItems(this.feedBack.items, {
        name: feedBackName,
        itemValue: !feedBackValue
      })
      localStorage.setItem("feedback", JSON.stringify(this.feedBack))
    }
  }
  submit() {
    this.spinner.show();
    this.feedBack.clinicId = 1
    this.submitFeedbackService.submit(this.feedBack).subscribe((response: any) => {
      this.spinner.hide();
      this.counterService.reviewCounter$.next(3);
    });
  }
  onClickLeaveFeebback() {
    this.isSubmitFeedback = true;
    this.feedBack.optionalFeedback = {
      patientName: '',
      feedback: '',
    }
  }
  private updateItems(items: FeedbackItem[], updateItem: FeedbackItem) {
    let indexToUpdate = items.findIndex(item => item.name === updateItem.name);
    if (indexToUpdate === -1)
      items.push(updateItem)
    items[indexToUpdate] = updateItem;
    items = Object.assign([], items);
  }
  private getFeedbackFeeling(feeling: string) {
    if (feeling === 'VeryGood' || feeling === 'Happy')
      this.feeling = true;
    if (feeling === 'Meh' || feeling === 'Frown')
      this.feeling = false;
  }
}
