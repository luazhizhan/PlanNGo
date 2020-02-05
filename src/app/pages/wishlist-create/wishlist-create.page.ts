import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../services/auth/auth.service';
import { WishListService } from '../../services/wishlist/wishlist.service';
import { UtilsService } from '../../services/utils/utils.service';
import { NgForm } from '@angular/forms';
import WishList from 'src/app/interfaces/wishlist';
import TravelPlan from 'src/app/interfaces/travelPlan';

@Component({
  selector: 'app-wishlist-create',
  templateUrl: './wishlist-create.page.html',
  styleUrls: ['./wishlist-create.page.scss'],
})
export class WishlistCreatePage implements OnInit {

  wishlist: WishList;
  wishForm: FormGroup;
  taskName: string;
  Category: string[] = ["Food","Places of Interest"];
  TravelPlan: TravelPlan;

  constructor(
    private modalCtrl: ModalController,
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private authSvc: AuthService,
    private WishPlanSvc: WishListService,
    private utilsSvc: UtilsService
  ) {
    this.Category = ['Food','Places of Interest']
    this.wishForm = this.formBuilder.group(
      {
        Category: ['', [Validators.required]],
        Name: ['', [Validators.required]],
        Description: ['', [Validators.required]],
        Location: ['', [Validators.required]],
        URL: ['', []],
        OpeningTime: ['', []],
        Price: ['', []]
      },
      {}
    );
   }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (Object.keys(params).length) {
        this.wishlist = JSON.parse(params.WishList);
        this.wishForm.setValue({
          Category: this.wishlist.Category,
          Name: this.wishlist.Name,
          Description: this.wishlist.Description,
          Location: this.wishlist.Location,
          URL: this.wishlist.URL,
          OpeningTime: this.wishlist.OpeningTime,
          Price: this.wishlist.Price
        });
        this.taskName = 'Update';
      } else {
        this.taskName = 'Create';
      }
    });
  }

  async onWishSubmit(values: WishList) {
    console.log("Testing");
    // if (this.wishForm.invalid) {
    //   const toast = await this.utilsSvc.presentToast(
    //     'Please fill up the necessary fields on the form.',
    //     'bottom',
    //     'danger',
    //     true
    //   );
    //   return toast.present();
    // }
    const loadingPopup = await this.utilsSvc.presentLoading('Loading...');
    console.log("Button")
    if (this.taskName === 'Create') {
      this.createWishList(values, loadingPopup);
    } else {
      console.log("123");
    }
  }

  onSubmit(form:NgForm){

  }

  createWishList(values: WishList, loadingPopup: HTMLIonLoadingElement) {
    console.log("Create button");
    this.setWishListObj(values,undefined,this.TravelPlan.travelPlanID);
    this.WishPlanSvc.createWishList(this.wishlist).subscribe(
      async result => {
        await this.utilsSvc.presentStatusToast(
          result.wishlistID,
          'Wish List created successfully'
        );
        if (result.wishlistID) {
          this.navCtrl.navigateRoot('/wishlistmain');
        }
      },
      async e => await this.utilsSvc.presentAsyncErrorToast(e),
      () => loadingPopup.dismiss()
    );
  }

  setWishListObj(values: WishList,wishlistID: number, travelPlanID: number) {
    this.wishlist = {
      // travelPlanID,
      wishlistID,
      Category: values.Category,
      Name: values.Name,
      Description: values.Description,
      Location: values.Location,
      URL: values.URL,
      OpeningTime: values.OpeningTime,
      Price: values.Price,
      travelPlanID
    };
  }

}
