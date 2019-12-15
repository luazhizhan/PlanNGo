import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CollaboratorModalComponent } from '../../components/collaborator-modal/collaborator-modal.component';

@Component({
  selector: 'app-plan-form',
  templateUrl: 'plan-form.page.html',
  styleUrls: ['plan-form.page.scss']
})
export class PlanFormPage {
  constructor(private modalCtrl: ModalController) { }

  async collaboratorClick() {
    const modal = await this.modalCtrl.create({
      component: CollaboratorModalComponent
    });
    return await modal.present();
  }
}
