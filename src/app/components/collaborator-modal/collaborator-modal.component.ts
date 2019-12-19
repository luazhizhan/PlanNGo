import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import User from 'src/app/interfaces/user';
import TravelPlan from 'src/app/interfaces/travelPlan';
import { PlanCollabService } from 'src/app/services/plan-collab/plan-collab.service';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { concat } from 'rxjs';
import { toArray } from 'rxjs/operators';

@Component({
  selector: 'collaborator-modal',
  templateUrl: './collaborator-modal.component.html',
  styleUrls: ['./collaborator-modal.component.scss']
})
export class CollaboratorModalComponent implements OnInit {

  @Input() user: User;
  @Input() travelPlan: TravelPlan;

  collabForm: FormGroup;
  planCollabs: User[];
  loading = true;

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private planCollabSvc: PlanCollabService,
    private utilsSvc: UtilsService,
    private authSvc: AuthService
  ) {
    this.collabForm = this.formBuilder.group({
      username: ['', [Validators.min(3)]],
      email: ['', [Validators.email]],
    });
  }

  ngOnInit() {
    this.planCollabSvc.getPlanCollabUserDetailByTravelPlanID(this.travelPlan.travelPlanID).subscribe(data => {
      this.planCollabs = data.results.map(planCollab => {
        return {
          userID: planCollab.userID,
          userName: planCollab.userName,
          email: planCollab.email
        };
      });
      this.loading = false;
    });
  }

  async planCollabClick(planCollab: User) {
    const alert = await this.utilsSvc.confirmAlert(
      'Remove Collaborator',
      planCollab.userName + ' will be remove from the plan',
      'Cancel',
      () => { },
      'Okay',
      async () => this.removeCollab(planCollab)
    );
    await alert.present();
  }

  // TODO : Check if user is already a collaborator
  async collabFormSubmit(values: any) {
    if (this.collabForm.invalid || !(values.username.trim() || values.email.trim())) {
      const toast = await this.utilsSvc.presentToast(
        'Invalid inputs found.',
        'bottom',
        'danger',
        true
      );
      return toast.present();
    }

    const loadingPopup = await this.utilsSvc.presentLoading('Seaching for user...');
    this.authSvc.getUserByUsernameOrEmail(values.username, values.email).subscribe(async (planCollab: User) => {
      loadingPopup.dismiss();
      if (planCollab) {
        planCollab.userID !== this.user.userID ?
          this.showCollabPopup(planCollab) :
          await this.presentErrorToast('You are the creator of the plan');
      } else {
        await this.presentErrorToast('User not found');
      }
    });
  }

  async dismissModal() {
    await this.modalCtrl.dismiss();
  }

  async presentErrorToast(errMsg: string) {
    const toast = await this.utilsSvc.presentToast(errMsg, 'bottom', 'danger', true);
    toast.present();
  }

  async showCollabPopup(planCollab: User) {
    const alert = await this.utilsSvc.confirmAlert(
      'Add Collaborator',
      planCollab.userName + ' will be added as a collaborator',
      'Cancel',
      () => { },
      'Okay',
      async () => this.addCollab(planCollab)
    );
    await alert.present();
  }

  async addCollab(planCollab: User) {
    const loadingPopup = await this.utilsSvc.presentLoading('Adding collaborator...');
    concat(
      this.planCollabSvc.addPlanCollab({ userID: planCollab.userID, travelPlanID: this.travelPlan.travelPlanID }),
      this.planCollabSvc.getPlanCollabUserDetailByTravelPlanID(this.travelPlan.travelPlanID)
    ).pipe(toArray()).subscribe(async results => {
      await this.utilsSvc.presentStatusToast(results[0].planCollaborateID, planCollab.userName + ' has been added as collaborator');
      this.planCollabs = results[1].results;
    }, async e => await this.utilsSvc.presentAsyncErrorToast(e), () => loadingPopup.dismiss());
  }

  async removeCollab(planCollab: User) {
    const loadingPopup = await this.utilsSvc.presentLoading('Removing collaborator...');
    concat(
      this.planCollabSvc.removePlanCollabByIds(this.travelPlan.travelPlanID, planCollab.userID),
      this.planCollabSvc.getPlanCollabUserDetailByTravelPlanID(this.travelPlan.travelPlanID)
    ).pipe(toArray()).subscribe(async results => {
      await this.utilsSvc.presentStatusToast(results[0].status === 'success', planCollab.userName + ' has been removed from the plan');
      this.planCollabs = results[1].results;
    }, async e => await this.utilsSvc.presentAsyncErrorToast(e), () => loadingPopup.dismiss());
  }
}
