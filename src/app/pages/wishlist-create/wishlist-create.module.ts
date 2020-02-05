import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WishlistCreatePage } from './wishlist-create.page';

const routes: Routes = [
  {
    path: '',
    component: WishlistCreatePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WishlistCreatePage]
})
export class WishlistCreatePageModule {}
