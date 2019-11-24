import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorModalComponent } from './collaborator-modal.component';

describe('CollaboratorModalComponent', () => {
  let component: CollaboratorModalComponent;
  let fixture: ComponentFixture<CollaboratorModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CollaboratorModalComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaboratorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
