import { Component, OnInit } from '@angular/core';
import { CounterService } from '../../services/counter.service';

@Component({
  selector: 'app-main-review',
  templateUrl: './main-review.component.html',
  styleUrls: ['./main-review.component.css']
})
export class MainReviewComponent implements OnInit {

  constructor(private counterService: CounterService) { }

  ngOnInit(): void {
  }
  next(event: any) {
    var name: string = event.target.name;
    if (name === 'VeryGood' || name === 'Happy')
      this.counterService.reviewCounter$.next(2);
    if (name === 'Meh' || name === 'Frown')
      this.counterService.reviewCounter$.next(3);
  }

}
