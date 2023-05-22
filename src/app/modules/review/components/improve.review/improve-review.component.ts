import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-improve-review',
  templateUrl: './improve-review.component.html',
  styleUrls: ['./improve-review.component.css']
})
export class ImproveReviewComponent implements OnInit {
  toggle = false;
  constructor() { }

  ngOnInit(): void {
  }
  enableDisableRule(job: any) {
    this.toggle = !this.toggle;
  }

}
