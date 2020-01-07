import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalFilterPage } from './journal-filter.page';

describe('JournalFilterPage', () => {
  let component: JournalFilterPage;
  let fixture: ComponentFixture<JournalFilterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JournalFilterPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalFilterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
