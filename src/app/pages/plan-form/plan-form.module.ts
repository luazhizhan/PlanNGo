import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlanFormPage } from './plan-form.page';
import { SharedModule } from '../../shared.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: PlanFormPage }])
  ],
  declarations: [PlanFormPage]
})
export class PlanFormPageModule {}
