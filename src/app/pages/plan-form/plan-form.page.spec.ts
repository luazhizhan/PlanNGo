import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { PlanFormPage } from './plan-form.page';

describe('PlanFormPage', () => {
  let component: PlanFormPage;
  let fixture: ComponentFixture<PlanFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlanFormPage],
      imports: [IonicModule.forRoot(), RouterTestingModule, HttpClientModule, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(PlanFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
