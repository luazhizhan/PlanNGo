import { TestBed } from '@angular/core/testing';

import { TravelPlanService } from './travel-plan.service';
import { HttpClientModule } from '@angular/common/http';

describe('TravelPlanService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: TravelPlanService = TestBed.get(TravelPlanService);
    expect(service).toBeTruthy();
  });
});
