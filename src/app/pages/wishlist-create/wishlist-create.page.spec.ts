import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistCreatePage } from './wishlist-create.page';

describe('WishlistCreatePage', () => {
  let component: WishlistCreatePage;
  let fixture: ComponentFixture<WishlistCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WishlistCreatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
