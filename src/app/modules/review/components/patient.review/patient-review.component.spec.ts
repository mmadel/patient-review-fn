import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientReviewComponent } from './patient-review.component';

describe('PatientReviewComponent', () => {
  let component: PatientReviewComponent;
  let fixture: ComponentFixture<PatientReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientReviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
