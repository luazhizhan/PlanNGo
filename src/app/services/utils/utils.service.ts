import { Injectable } from '@angular/core';
import { AlertController, ToastController, NavController, LoadingController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  constructor(
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
  ) { }

  async confirmAlert(
    header: string,
    msg: string,
    cancelTxt: string,
    cancelFunc: () => void,
    okayTxt: string,
    okayFunc: () => void
  ): Promise<HTMLIonAlertElement> {
    return await this.alertCtrl.create({
      header,
      message: msg,
      buttons: [
        {
          text: cancelTxt,
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => cancelFunc()
        },
        {
          text: okayTxt,
          handler: () => okayFunc()
        }
      ]
    });
  }

  async presentToast(
    message: string,
    position: 'bottom' | 'middle' | 'top',
    color: string,
    showCloseButton: boolean
  ): Promise<HTMLIonToastElement> {
    return await this.toastCtrl.create({
      message,
      position,
      color,
      showCloseButton,
      duration: 3000
    });
  }

  async presentLoading(message: string): Promise<HTMLIonLoadingElement> {
    const loadingPopup = await this.loadingCtrl.create({
      message
    });
    loadingPopup.present();
    return loadingPopup;
  }

  async presentAsyncErrorToast(e) {
    console.error(e);
    const toast = await this.presentToast(
      'An error has occur, please try again later',
      'bottom',
      'danger',
      true
    );
    return toast.present();
  }

  navigateForward(params: any, path: string) {
    const navigationExtras: NavigationExtras = {
      queryParams: params
    };
    this.navCtrl.navigateForward([path], navigationExtras);
  }
}
