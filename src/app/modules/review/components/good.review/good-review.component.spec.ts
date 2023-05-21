import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodReviewComponent } from './good-review.component';

describe('GoodReviewComponent', () => {
  let component: GoodReviewComponent;
  let fixture: ComponentFixture<GoodReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoodReviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoodReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
