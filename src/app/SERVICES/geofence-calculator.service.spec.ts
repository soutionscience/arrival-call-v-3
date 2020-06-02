import { TestBed } from '@angular/core/testing';

import { GeofenceCalculatorService } from './geofence-calculator.service';

describe('GeofenceCalculatorService', () => {
  let service: GeofenceCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeofenceCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
