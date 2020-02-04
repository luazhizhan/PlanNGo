import { TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { UtilsService } from './utils.service';

describe('UtilsService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [IonicModule, RouterTestingModule]
    })
  );

  it('should be created', () => {
    const service: UtilsService = TestBed.get(UtilsService);
    expect(service).toBeTruthy();
  });
});
