import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CollaboratorModalComponent } from '../../components/collaborator-modal/collaborator-modal.component';

@Component({
  selector: 'app-plan',
  templateUrl: 'plan.page.html',
  styleUrls: ['plan.page.scss']
})
export class PlanPage {
  constructor(private modalCtrl: ModalController) {}

  async collaboratorClick() {
    const modal = await this.modalCtrl.create({
      component: CollaboratorModalComponent
    });
    return await modal.present();
  }
}
