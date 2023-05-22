import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';

@Component({
  selector: 'app-good-review',
  templateUrl: './good-review.component.html',
  styleUrls: ['./good-review.component.css']
})
export class GoodReviewComponent implements OnInit {
  toggle = false;
  enableDisableRule(job: any) {
    this.toggle = !this.toggle;
  }
  constructor() { }

  ngOnInit(): void {

  }

}
