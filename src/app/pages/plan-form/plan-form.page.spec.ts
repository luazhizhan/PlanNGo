import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { PlanFormPage } from './plan-form.page';

describe('PlanFormPage', () => {
  let component: PlanFormPage;
  let fixture: ComponentFixture<PlanFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlanFormPage],
      imports: [IonicModule.forRoot(), RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(PlanFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
