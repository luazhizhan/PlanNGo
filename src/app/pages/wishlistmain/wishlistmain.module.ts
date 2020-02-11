import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WishlistmainPage } from './wishlistmain.page';

const routes: Routes = [
  {
    path: '',
    component: WishlistmainPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WishlistmainPage]
})
export class WishlistmainPageModule {}
