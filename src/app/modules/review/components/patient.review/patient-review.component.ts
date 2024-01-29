import { Component, OnInit } from '@angular/core';
import { CounterService } from '../../services/counter.service';

@Component({
  selector: 'app-patient-review',
  templateUrl: './patient-review.component.html',
  styleUrls: ['./patient-review.component.css']
})
export class PatientReviewComponent implements OnInit {
  counter: number = 0;
  progressValue: number = 0;
  cards: { id: number, name: string }[] = [
    { "id": 1, "name": "Feedback Review" },
    { "id": 2, "name": "Feedback Item Review" },
  ];
  constructor(private counterService: CounterService) { }

  ngOnInit(): void {

    this.counterService.reviewCounter$.subscribe((reviewCounter: number) => {
      this.counter = reviewCounter;
      if (reviewCounter > 1)
        this.proceedToNextStep();
    });
  }
  next() {
  }
  proceedToNextStep() {
    this.calculatePercentage('next');
    this.scrollUp();
  }
  calculatePercentage(action: string) {
    var index: number = 0;
    if (action === 'back')
      index--;
    if (this.counter === 2)
      index = 1;
    if (this.counter === 3)
      index = 2
    this.progressValue = Math.round(((index / this.cards.length) / 100) * 10000);
  }
  scrollUp() {
    (function smoothscroll() {
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.scrollTo(0, 0);
      }
    })();
  }
}
