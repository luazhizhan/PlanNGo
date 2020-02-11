import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistmainPage } from './wishlistmain.page';

describe('WishlistmainPage', () => {
  let component: WishlistmainPage;
  let fixture: ComponentFixture<WishlistmainPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WishlistmainPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistmainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
