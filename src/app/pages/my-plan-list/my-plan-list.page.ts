import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../services/auth/auth.service';
import { TravelPlanService } from '../../services/travel-plan/travel-plan.service';
import { UtilsService } from '../../services/utils/utils.service'
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
    this.getTravelPlansByUserID();
  }

  async doRefresh(e) {
    console.log(e);
  }

  getTravelPlansByUserID() {
    this.travelPlanSvc.getTravelPlansByUserID(this.user.userID).subscribe(travelPlans => {
      this.travelPlans = travelPlans.results;
      this.loading = false;
    }, async e => await this.utilsSvc.presentAsyncErrorToast(e));
  }

  async delTravelPlanClick(travelPlan: TravelPlan) {
    const loadingPopup = await this.utilsSvc.presentLoading('Deleting plan...');
    loadingPopup.present();
    this.travelPlanSvc.delTravelPlanByIDs(travelPlan.travelPlanID, travelPlan.userID).subscribe(async results => {
      const toastPopup = results.status === 'success' ?
        await this.utilsSvc.presentToast(
          'Travel plan deleted successfully',
          "bottom",
          'secondary',
          true
        )
        : await this.utilsSvc.presentToast(
          'An error has occur, please try again later',
          "bottom",
          'danger',
          true
        );
      this.travelPlanSvc.getTravelPlansByUserID(this.user.userID).subscribe(travelPlans => {
        this.travelPlans = travelPlans.results;
        toastPopup.present();
        loadingPopup.dismiss();
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
}
