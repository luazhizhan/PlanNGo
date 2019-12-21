import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AngularDelegate, ModalController } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CollaboratorModalComponent } from './collaborator-modal.component';

describe('CollaboratorModalComponent', () => {
  let component: CollaboratorModalComponent;
  let fixture: ComponentFixture<CollaboratorModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, IonicModule, ReactiveFormsModule, RouterTestingModule],
      declarations: [CollaboratorModalComponent],
      providers: [AngularDelegate, ModalController],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaboratorModalComponent);
    component = fixture.componentInstance;
    component.travelPlan = {
      travelPlanID: 1,
      title: 'title',
      country: 'country',
      desc: "'Lorem ipsum dolor sit amet,",
      dateGoing: new Date(),
      dateReturning: new Date()
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
