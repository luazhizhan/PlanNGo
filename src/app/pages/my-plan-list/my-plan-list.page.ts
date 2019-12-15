import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../services/auth/auth.service';
import { TravelPlanService } from '../../services/travel-plan/travel-plan.service';
import { UtilsService } from '../../services/utils/utils.service';
import User from 'src/app/interfaces/user';
import TravelPlan from 'src/app/interfaces/travelPlan';

@Component({
  selector: 'app-my-plan-list',
  templateUrl: './my-plan-list.page.html',
  styleUrls: ['./my-plan-list.page.scss'],
})
export class MyPlanListPage implements OnInit {
  user: User;
  travelPlans: TravelPlan[];
  loading = true;

  constructor(
    private navCtrl: NavController,
    private authSvc: AuthService,
    private travelPlanSvc: TravelPlanService,
    private utilsSvc: UtilsService
  ) { }

  async ngOnInit() {
    this.user = this.authSvc.getUserInfo();
    this.travelPlanSvc.getTravelPlansByUserID(this.user.userID).subscribe(travelPlans => {
      this.travelPlans = travelPlans.results;
      this.loading = false;
    }, async e => await this.utilsSvc.presentAsyncErrorToast(e));
  }

  async doRefresh(e: any) {
    this.travelPlanSvc.getTravelPlansByUserID(this.user.userID).subscribe(travelPlans => {
      this.travelPlans = travelPlans.results;
      e.target.complete();
    }, async error => await this.utilsSvc.presentAsyncErrorToast(error));
  }

  async delTravelPlanClick(travelPlan: TravelPlan) {
    const loadingPopup = await this.utilsSvc.presentLoading('Deleting travel plan...');
    this.travelPlanSvc.delTravelPlanByIDs(travelPlan.travelPlanID, travelPlan.userID)
      .subscribe(async result => {
        const toastPopup = result.status === 'success' ?
          await this.utilsSvc.presentToast(
            'Travel plan deleted successfully',
            'bottom',
            'secondary',
            true
          )
          : await this.utilsSvc.presentToast(
            'An error has occur, please try again later',
            'bottom',
            'danger',
            true
          );
        this.travelPlanSvc.getTravelPlansByUserID(this.user.userID).subscribe(travelPlans => {
          this.travelPlans = travelPlans.results;
          loadingPopup.dismiss();
          toastPopup.present();
        }, async e => await this.utilsSvc.presentAsyncErrorToast(e));
      }, async e => await this.utilsSvc.presentAsyncErrorToast(e));
  }

  async delTravelPlan(travelPlan: TravelPlan) {
    const alert = await this.utilsSvc.confirmAlert(
      'Delete Plan',
      travelPlan.title + ' will be delete.',
      'Cancel',
      () => { },
      'Okay',
      async () => this.delTravelPlanClick(travelPlan)
    );
    await alert.present();
  }

  travelPlanClick(travelPlan: TravelPlan) {
    this.utilsSvc.navigateForward({
      travelPlan: JSON.stringify(travelPlan),
    }, '/tabs/plan/plan-form/');
  }
}
