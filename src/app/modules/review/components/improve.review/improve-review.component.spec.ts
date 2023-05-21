import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImproveReviewComponent } from './improve-review.component';

describe('ImproveReviewComponent', () => {
  let component: ImproveReviewComponent;
  let fixture: ComponentFixture<ImproveReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImproveReviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImproveReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
