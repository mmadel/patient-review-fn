import { TestBed } from '@angular/core/testing';

import { DashboardFeedbackService } from './dashboard-feedback.service';

describe('DashboardFeedbackService', () => {
  let service: DashboardFeedbackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardFeedbackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
