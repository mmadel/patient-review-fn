import { Component, OnInit } from '@angular/core';
import { CounterService } from '../../services/counter.service';

@Component({
  selector: 'app-patient-review',
  templateUrl: './patient-review.component.html',
  styleUrls: ['./patient-review.component.css']
})
export class PatientReviewComponent implements OnInit {
  counter: number = 1;
  progressValue: number = 0;
  cards: { id: number, name: string }[] = [
    { "id": 1, "name": "Main Review" },
    { "id": 2, "name": "Good Review" },
    { "id": 3, "name": "Improve Review" }
  ];
  constructor(private counterService: CounterService) { }

  ngOnInit(): void {
    this.counterService.reviewCounter$.subscribe((reviewCounter: number) => {
      this.counter = reviewCounter;
    });
  }
  next() {
    this.proceedToNextStep();
  }
  proceedToNextStep() {
    this.calculatePercentage(this.counter, 'next')
    this.counter++;
    this.scrollUp();
  }
  calculatePercentage(index: number, action: string) {
    if (action === 'back')
      index--;
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
