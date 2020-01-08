import { TestBed } from '@angular/core/testing';

import { TravelJournalService } from './travel-journal.service';

describe('TravelJournalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TravelJournalService = TestBed.get(TravelJournalService);
    expect(service).toBeTruthy();
  });
});
