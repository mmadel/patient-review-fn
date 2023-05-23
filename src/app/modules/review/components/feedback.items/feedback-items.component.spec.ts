import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackItemsComponent } from './feedback-items.component';

describe('FeedbackItemsComponent', () => {
  let component: FeedbackItemsComponent;
  let fixture: ComponentFixture<FeedbackItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedbackItemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedbackItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
