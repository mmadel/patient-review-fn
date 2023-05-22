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
    { "id": 1, "name": "Main Review" },
    { "id": 2, "name": "Good Review" },
    { "id": 3, "name": "Improve Review" }
  ];
  constructor(private counterService: CounterService) { }

  ngOnInit(): void {

    this.counterService.reviewCounter$.subscribe((reviewCounter: number) => {
      this.counter = reviewCounter;
      console.log(this.counter)
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
    if (this.counter === 2 || this.counter === 3)
      index = 2;
    if (this.counter === 4)
      index = 3
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
