import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CreateWishlistPage } from './create-wishlist';

//import { IonicPageModule } from '@ionic/angular';

//const routes: Routes = [
  //{
    //path: '',
    //component: CreateWishlistPage
  //}
//];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    //IonicPageModule.forChild(CreateWishlistPage),
    //RouterModule.forChild(routes)
  ],
  declarations: [CreateWishlistPage]
})
export class CreateWishlistPageModule {}
