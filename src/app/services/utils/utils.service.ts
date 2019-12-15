import { Injectable } from '@angular/core';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  constructor(
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
  ) { }

  async confirmAlert(
    header: string,
    msg: string,
    cancelTxt: string,
    cancelFunc: Function,
    okayTxt: string,
    okayFunc: Function
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
    position: "bottom" | "middle" | "top",
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
    return await this.loadingCtrl.create({
      message
    });
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
}
