import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit {
  constructor(private navCtrl: NavController, private authSvc: AuthService) {}

  ngOnInit() {}

  logout() {
    this.authSvc.logout();
    this.navCtrl.navigateForward('/');
  }
}
