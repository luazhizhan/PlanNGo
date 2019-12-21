import { TestBed } from '@angular/core/testing';
import { PlanCollabService } from './plan-collab.service';
import { HttpClientModule } from '@angular/common/http';

describe('PlanCollabService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    })
  );

  it('should be created', () => {
    const service: PlanCollabService = TestBed.get(PlanCollabService);
    expect(service).toBeTruthy();
  });
});
