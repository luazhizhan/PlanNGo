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
import WishList from 'src/app/interfaces/wishlist';
import { CollaboratorModalComponent } from '../../components/collaborator-modal/collaborator-modal.component';
import { WishlistmainPage } from '../wishlistmain/wishlistmain.page';
import { WishListService } from '../../services/wishlist/wishlist.service';

@Component({
  selector: 'app-plan-form',
  templateUrl: 'plan-form.page.html',
  styleUrls: ['plan-form.page.scss']
})
export class PlanFormPage implements OnInit {
  taskName: string;
  planForm: FormGroup;
  isCollab: boolean;
  user: User;
  travelPlan: TravelPlan;
  wishList: WishList;

  constructor(
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private authSvc: AuthService,
    private travelPlanSvc: TravelPlanService,
    private utilsSvc: UtilsService,
    private wishListSvc: WishListService
  ) {
    this.planForm = this.formBuilder.group(
      {
        title: ['', [Validators.required]],
        dateGoing: ['', [Validators.required]],
        dateReturning: ['', [Validators.required]],
        country: ['', [Validators.required]],
        desc: ['', [Validators.minLength(3)]],
        flightCode: ['', []],
        boardingTime: ['', []],
        seatInfo: ['', []]
      },
      {}
    );
  }

  ngOnInit() {
    this.user = this.authSvc.getUserInfo();
    this.activatedRoute.queryParams.subscribe(async params => {
      if (Object.keys(params).length) {
        if (params.travelPlan) {
          this.travelPlan = JSON.parse(params.travelPlan);
          this.isCollab = this.travelPlan.userID === this.user.userID ? false : true;
          this.planForm.setValue({
            title: this.travelPlan.title,
            dateGoing: this.travelPlan.dateGoing,
            dateReturning: this.travelPlan.dateReturning,
            country: this.travelPlan.country,
            desc: this.travelPlan.desc,
            flightCode: this.travelPlan.flightCode,
            boardingTime: this.travelPlan.boardingTime,
            seatInfo: this.travelPlan.seatInfo
          });
          const param = {
            travelPlanID: this.travelPlan.travelPlanID
          }
          await this.fetchWishList(param);
          this.taskName = 'Update';
        } else {
          console.log(params.country);
          this.planForm.setValue({
            title: params.country + ' Trip',
            dateGoing: '',
            dateReturning: '',
            country: params.country,
            desc: 'Going to ' + params.country + '!',
            flightCode: '',
            boardingTime: '',
            seatInfo: ''
          });
          this.isCollab = true;
          this.taskName = 'Create';
        }
      } else {
        this.isCollab = true;
        this.taskName = 'Create';
      }
    });
  }

  async collaboratorClick() {
    const modal = await this.modalCtrl.create({
      component: CollaboratorModalComponent,
      componentProps: {
        travelPlan: this.travelPlan,
        user: this.user
      }
    });
    return await modal.present();
  }

  async toWishPage() {
    console.log("testing 123");
    const modal = await this.modalCtrl.create({
      component: WishlistmainPage
    });
    console.log("test 2");
    return await modal.present();
  }
  async onPlanSubmit(values: TravelPlan) {
    if (this.planForm.invalid) {
      const toast = await this.utilsSvc.presentToast(
        'Please fill up the necessary fields on the form.',
        'bottom',
        'danger',
        true
      );
      return toast.present();
    }
    const loadingPopup = await this.utilsSvc.presentLoading('Loading...');
    if (this.taskName === 'Create') {
      this.createTravelPlan(values, loadingPopup);
    } else {
      this.updateTravelPlan(values, loadingPopup);
    }
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
      userID
    };
  }

  createTravelPlan(values: TravelPlan, loadingPopup: HTMLIonLoadingElement) {
    this.setTravelPlanObj(undefined, this.user.userID, values);
    this.travelPlanSvc.createTravelPlan(this.travelPlan).subscribe(
      async result => {
        console.log(result, 'plan result')
        await this.utilsSvc.presentStatusToast(
          result,
          'Travel plan created successfully'
        );
        console.log(result.travelPlanID, 'result travel!')
        if (result) {
          this.navCtrl.navigateRoot('/tabs/plan');
        }
      },
      async e => await this.utilsSvc.presentAsyncErrorToast(e),
      () => loadingPopup.dismiss()
    );

  }

  updateTravelPlan(values: TravelPlan, loadingPopup: HTMLIonLoadingElement) {
    this.setTravelPlanObj(this.travelPlan.travelPlanID, this.travelPlan.userID, values);
    this.travelPlanSvc.updateTravelPlanByTravelPlanID(this.travelPlan).subscribe(
      async result => {
        await this.utilsSvc.presentStatusToast(
          result.status === 'success',
          'Travel plan updated successfully'
        );
      },
      async e => await this.utilsSvc.presentAsyncErrorToast(e),
      () => loadingPopup.dismiss()
    );
  }

  async goToWishList() {
    this.utilsSvc.navigateForward({
      travelPlanID: this.travelPlan.travelPlanID
    }, '/wishlistmain')
  }

  async fetchWishList(wishlistParams) {
    this.wishListSvc.getWishLists(wishlistParams).subscribe(
      wishList => {
        this.wishList = wishList
      }
    )
  }
  // goTowishlistMainPage()
  // {
  //   this.navCtrl.push(WishlistmainPage,{});
  // }
  //gotowishlistpage(){
  //this.navCtrl.push(WishlistMainPage);
  //}
  //async gotowishlistpage(){

  //}
}
