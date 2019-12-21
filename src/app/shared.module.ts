import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Components */
import { CollaboratorModalComponent } from './components/collaborator-modal/collaborator-modal.component';

@NgModule({
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule, RouterModule],
  declarations: [CollaboratorModalComponent],
  exports: [CollaboratorModalComponent],
  entryComponents: [CollaboratorModalComponent]
})
export class SharedModule {}
