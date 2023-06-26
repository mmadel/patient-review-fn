import { TestBed } from '@angular/core/testing';

import { PerformanceIndexService } from './performance-index.service';

describe('PerformanceIndexService', () => {
  let service: PerformanceIndexService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerformanceIndexService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
