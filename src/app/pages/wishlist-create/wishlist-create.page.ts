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
import User from 'src/app/interfaces/user';
import { invalid } from '@angular/compiler/src/render3/view/util';

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
  user: User;

  

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
        category: ['', [Validators.required]],
        name: ['', [Validators.required]],
        description: ['', [Validators.required]],
        location: ['', [Validators.required]],
        url: ['', []],
        openingTime: ['', []],
        price: ['', [Validators.min(1)]]
      },
      {}
    );
   }

   

  ngOnInit() {
    this.user = this.authSvc.getUserInfo();
    this.activatedRoute.queryParams.subscribe(params => {
      if (Object.keys(params).length) {
        this.wishlist = JSON.parse(params.WishList);
        this.wishForm.setValue({
          category: this.wishlist.category,
          name: this.wishlist.name,
          description: this.wishlist.description,
          location: this.wishlist.location,
          url: this.wishlist.url,
          openingTime: this.wishlist.openingTime,
          price: this.wishlist.price
        });
        this.taskName = 'Update';
      } else {
        this.taskName = 'Create';
      }
    });
  }

  async onWishSubmit(values: WishList) {
    console.log("Testing");
    console.log(this.wishForm,'wishForm');
    const x = document.forms["wishForm"]["price"].values;
    console.log(x,'Price value')
    if (this.wishForm.invalid) {
      const toast = await this.utilsSvc.presentToast(
        'Please fill up the necessary fields on the form.',
        'bottom',
        'danger',
        true
      );
      return toast.present();
      console.log('Error!')
    }
   

    this.wishForm.get('price').hasError('minlength');
    
    
    const loadingPopup = await this.utilsSvc.presentLoading('Loading...');
    console.log("Button")
    if (this.taskName === 'Create') {
      this.createWishList(values, loadingPopup);
    } else {
      console.log("123");
    }
  }

  // onSubmit(form:NgForm){

  // }

  createWishList(values: WishList, loadingPopup: HTMLIonLoadingElement) {
    console.log("Create button");
    this.setWishListObj(values,undefined);

    this.WishPlanSvc.createWishList(this.wishlist).subscribe(
      async result => {

        await this.utilsSvc.presentStatusToast(
          result.results.insertId,
          'Wish List created successfully'
        );

        if (result.results.insertId) {
          this.navCtrl.navigateRoot('/wishlistmain');
        }
      },
      async e => await this.utilsSvc.presentAsyncErrorToast(e),
      () => loadingPopup.dismiss()
    );
  }

  setWishListObj(values: WishList,wishlistID: number) {
    console.log(values,'wishlistobj')
    this.wishlist = {
      // travelPlanID,
      wishlistID,
      category: values.category,
      name: values.name,
      description: values.description,
      location: values.location,
      url: values.url,
      openingTime: values.openingTime,
      price: values.price,
      //travelPlanID,
      userID:this.user.userID
    };
    console.log(this.wishlist,'final')
  }

}
