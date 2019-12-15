import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../services/auth/auth.service';
import { UtilsService } from '../../services/utils/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  authForm: FormGroup;
  btnDisabled = false;

  constructor(
    private navCtrl: NavController,
    private authSvc: AuthService,
    private utilsSvc: UtilsService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      pwd: ['', [Validators.required]],
    }, {});
  }

  async loginAuth(values) {
    this.btnDisabled = true;
    let toast: HTMLIonToastElement;
    if (this.authForm.invalid) {
      this.btnDisabled = false;
      toast = await this.utilsSvc.presentToast(
        'Please enter your username and password',
        'bottom',
        'danger',
        true
      );
      return toast.present();
    }
    this.authSvc.login(values.username, values.pwd).subscribe(async validUser => {
      if (validUser) {
        this.btnDisabled = false;
        this.authSvc.saveUserInfo(validUser);
        this.navCtrl.navigateForward('/tabs/home');
      } else {
        this.btnDisabled = false;
        toast = await this.utilsSvc.presentToast(
          'Wrong username or password',
          'bottom',
          'danger',
          true
        );
        return toast.present();
      }
    }, async e => await this.utilsSvc.presentAsyncErrorToast(e));
  }
}
