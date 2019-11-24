import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'collaborator-modal',
  templateUrl: './collaborator-modal.component.html',
  styleUrls: ['./collaborator-modal.component.scss']
})
export class CollaboratorModalComponent implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  async dismissModal() {
    await this.modalCtrl.dismiss();
  }
}
