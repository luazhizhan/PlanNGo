import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../services/auth/auth.service';
import { TravelPlanService } from '../../services/travel-plan/travel-plan.service';
import { UtilsService } from '../../services/utils/utils.service';
import User from 'src/app/interfaces/user';
import TravelPlan from 'src/app/interfaces/travelPlan';
import { CollaboratorModalComponent } from '../../components/collaborator-modal/collaborator-modal.component';



@Component({
  selector: 'app-plan-form',
  templateUrl: 'plan-form.page.html',
  styleUrls: ['plan-form.page.scss']
})
export class PlanFormPage implements OnInit {
  btnName: string;
  planForm: FormGroup;
  user: User;
  travelPlan: TravelPlan;

  constructor(
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private authSvc: AuthService,
    private travelPlanSvc: TravelPlanService,
    private utilsSvc: UtilsService
  ) {
    this.planForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      dateGoing: ['', [Validators.required]],
      dateReturning: ['', [Validators.required]],
      country: ['', [Validators.required]],
      desc: ['', [Validators.minLength(3)]],
      flightCode: ['', []],
      boardingTime: ['', []],
      seatInfo: ['', []],
      flightReminder: ['', []],
    }, {});
  }

  ngOnInit() {
    this.user = this.authSvc.getUserInfo();
    this.activatedRoute.queryParams.subscribe(params => {
      if (Object.keys(params).length) {
        this.travelPlan = JSON.parse(params.travelPlan);
        this.planForm.setValue({
          title: this.travelPlan.title,
          dateGoing: this.travelPlan.dateGoing,
          dateReturning: this.travelPlan.dateReturning,
          country: this.travelPlan.country,
          desc: this.travelPlan.desc,
          flightCode: this.travelPlan.flightCode,
          boardingTime: this.travelPlan.boardingTime,
          seatInfo: this.travelPlan.seatInfo,
          flightReminder: this.travelPlan.flightReminder,
        });
        this.btnName = 'Update';
      } else {
        console.log(false);
        this.btnName = 'Create';
      }
    });
  }

  async collaboratorClick() {
    const modal = await this.modalCtrl.create({
      component: CollaboratorModalComponent
    });
    return await modal.present();
  }

  async onPlanSubmit(values: TravelPlan) {
    let toast: HTMLIonToastElement;
    if (this.planForm.invalid) {
      toast = await this.utilsSvc.presentToast(
        'Please fill up the necessary fields on the form.',
        'bottom',
        'danger',
        true
      );
      return toast.present();
    }
    const loadingPopup = await this.utilsSvc.presentLoading('Loading...');
    if (this.btnName === 'Create') {
      this.createTravelPlan(values, loadingPopup, toast);
    } else {
      this.updateTravelPlan(values, loadingPopup, toast);
    }
  }

  createTravelPlan(values: TravelPlan, loadingPopup: HTMLIonLoadingElement, toast: HTMLIonToastElement) {
    this.setTravelPlanObj(undefined, this.user.userID, values);
    this.travelPlanSvc.createTravelPlan(this.travelPlan).subscribe(async result => {
      loadingPopup.dismiss();
      if (result.travelPlanId) {
        toast = await this.utilsSvc.presentToast(
          'Travel plan created successfully',
          'bottom',
          'secondary',
          true
        );
        toast.present();
        this.navCtrl.navigateRoot('/tabs/plan');
      } else {
        toast = await this.utilsSvc.presentToast(
          'An error has occur, please try again later',
          'bottom',
          'danger',
          true
        );
        toast.present();
      }
    });
  }

  updateTravelPlan(values: TravelPlan, loadingPopup: HTMLIonLoadingElement, toast: HTMLIonToastElement) {
    this.setTravelPlanObj(this.travelPlan.travelPlanID, this.travelPlan.userID, values);
    this.travelPlanSvc.updateTravelPlanByTravelPlanID(this.travelPlan)
      .subscribe(async result => {
        toast = result.status === 'success' ?
          await this.utilsSvc.presentToast(
            'Travel plan updated successfully',
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
        loadingPopup.dismiss();
        toast.present();
      });
  }

  setTravelPlanObj(travelPlanID: number, userID: number, values: TravelPlan) {
    this.travelPlan = {
      travelPlanID,
      title: values.title,
      dateGoing: values.dateGoing,
      dateReturning: values.dateReturning,
      country: values.country,
      desc: values.desc,
      flightCode: values.flightCode,
      boardingTime: values.boardingTime,
      seatInfo: values.seatInfo,
      flightReminder: values.flightReminder,
      userID
    };
  }
}
