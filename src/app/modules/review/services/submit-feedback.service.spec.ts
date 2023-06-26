import { TestBed } from '@angular/core/testing';

import { SubmitFeedbackService } from './submit-feedback.service';

describe('SubmitFeedbackService', () => {
  let service: SubmitFeedbackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubmitFeedbackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
