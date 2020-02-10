import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../services/auth/auth.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit {
  constructor(
    private navCtrl: NavController,
    private authSvc: AuthService,
    private utilsSvc: UtilsService
  ) {}

  ngOnInit() {}

  async logout() {
    const alert = await this.utilsSvc.confirmAlert(
      'Logging out',
      'You will be log out from this app.',
      'Cancel',
      () => {},
      'Okay',
      async () => {
        this.authSvc.logout();
        this.navCtrl.navigateForward('/');
      }
    );
    await alert.present();
  }
}
