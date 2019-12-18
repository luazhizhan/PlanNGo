import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { TravelPlanService } from '../../services/travel-plan/travel-plan.service';
import { PlanCollabService } from '../../services/plan-collab/plan-collab.service';
import { UtilsService } from '../../services/utils/utils.service';
import { concat } from 'rxjs';
import { toArray } from 'rxjs/operators';
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
  planCollabTravelPlans: TravelPlan[];
  loading = true;

  constructor(
    private authSvc: AuthService,
    private travelPlanSvc: TravelPlanService,
    private planCollabSvc: PlanCollabService,
    private utilsSvc: UtilsService
  ) { }

  async ngOnInit() {
    this.user = this.authSvc.getUserInfo();
    this.travelPlanSvc.getAllTravelPlans(this.user.userID).subscribe(travelPlans => {
      this.travelPlans = travelPlans[0].results;
      this.planCollabTravelPlans = travelPlans[1].results;
      this.loading = false;
    }, async e => await this.utilsSvc.presentAsyncErrorToast(e));
  }

  async doRefresh(e: any) {
    this.travelPlanSvc.getAllTravelPlans(this.user.userID).subscribe(travelPlans => {
      this.travelPlans = travelPlans[0].results;
      this.planCollabTravelPlans = travelPlans[1].results;
      e.target.complete();
    }, async error => await this.utilsSvc.presentAsyncErrorToast(error));
  }

  async showToastMsg(status: string): Promise<HTMLIonToastElement> {
    return status === 'success' ?
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
  }

  async delTravelPlanClick(travelPlan: TravelPlan) {
    const loadingPopup = await this.utilsSvc.presentLoading('Deleting travel plan...');
    concat(
      this.travelPlanSvc.delTravelPlanByIDs(travelPlan.travelPlanID, travelPlan.userID),
      this.travelPlanSvc.getTravelPlansByUserID(this.user.userID)
    ).pipe(toArray()).subscribe(async results => {
      const toastPopup = await this.showToastMsg(results[0].status);
      this.travelPlans = results[1].results;
      loadingPopup.dismiss();
      toastPopup.present();
    }, async e => await this.utilsSvc.presentAsyncErrorToast(e));
  }

  async delPlanCollabTravelPlanClick(travelPlan: TravelPlan) {
    const loadingPopup = await this.utilsSvc.presentLoading('Leaving travel plan...');
    concat(
      this.planCollabSvc.removePlanCollabByIds(travelPlan.travelPlanID, this.user.userID),
      this.travelPlanSvc.getTravelPlanByPlanCollabUserID(this.user.userID)
    ).pipe(toArray()).subscribe(async results => {
      console.log(results);
      const toastPopup = await this.showToastMsg(results[0].status);
      this.planCollabTravelPlans = results[1].results;
      loadingPopup.dismiss();
      toastPopup.present();
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

  async delPlanCollabTravelPlan(travelPlan: TravelPlan) {
    const alert = await this.utilsSvc.confirmAlert(
      'Leave Plan',
      'You will be remove from' + travelPlan.title,
      'Cancel',
      () => { },
      'Okay',
      async () => this.delPlanCollabTravelPlanClick(travelPlan)
    );
    await alert.present();
  }

  travelPlanClick(travelPlan: TravelPlan) {
    this.utilsSvc.navigateForward({
      travelPlan: JSON.stringify(travelPlan),
    }, '/tabs/plan/plan-form/');
  }
}
