import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistDetailPage } from './wishlist-detail.page';

describe('WishlistDetailPage', () => {
  let component: WishlistDetailPage;
  let fixture: ComponentFixture<WishlistDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WishlistDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
