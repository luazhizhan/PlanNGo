import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { WishListService } from '../../services/wishlist/wishlist.service';
import { UtilsService } from '../../services/utils/utils.service';
import WishList from 'src/app/interfaces/wishlist';
import { concat } from 'rxjs';
import User from 'src/app/interfaces/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-wishlistmain',
  templateUrl: './wishlistmain.page.html',
  styleUrls: ['./wishlistmain.page.scss'],
})
export class WishlistmainPage implements OnInit {

  wishlists: WishList[];
  travelPlanID:0;
  loading=true;
  categoryValue=' Places Of Interest';
  user: User;

  constructor(
    private authSvc: AuthService,
    private wishlistSvc: WishListService,
    private utilsSvc: UtilsService,
    private activatedRoute: ActivatedRoute
  ) { 
    //const travelPlanID = activatedRoute.snapshot.params["travelPlanID"]
    //console.log(travelPlanID,'travel plan id');
  }

  async ngOnInit() {
    console.log("wishlistmain");
    this.user = this.authSvc.getUserInfo();
    this.activatedRoute.queryParams.subscribe(params=>{
      if(Object.keys(params).length){
        this.travelPlanID=JSON.parse(params.travelPlanID);
      }
    })
    const params={
      category:this.categoryValue,
      userID:this.user.userID
    }
    this.wishlistSvc.getWishLists(params).subscribe(
      wishlists => {
        this.wishlists = wishlists.results;
        // this.wishlists = Array.of(this.wishlists);
        console.log(wishlists,"get result");
        this.loading=false;
      },
      async e => await this.utilsSvc.presentAsyncErrorToast(e)
    );
  }

  deleteWishList(item:WishList){
    this.wishlists.splice(this.wishlists.indexOf(item),1);
    const params={
      wishlistID: item.wishlistID
    }
    this.wishlistSvc.deleteWishList(params).subscribe(Response => {
      this.wishlistSvc.getWishList();
    });
  }

  addWishListToTravelPlan(){
    
  }

  async wishListClick(wishlistID){
    this.utilsSvc.navigateForward({
     travelPlanID:this.travelPlanID
    },`/wishlist-detail/${wishlistID}`)
  }

  segmentChanged(ev: any) {
    this.categoryValue = ev.detail.value;
    this.loading=true;
    const params={
      category:this.categoryValue
    }
    this.wishlistSvc.getWishLists(params).subscribe(
      wishlists => {
        this.wishlists = wishlists.results;
        this.loading=false;
      },
      async e => await this.utilsSvc.presentAsyncErrorToast(e)
    );
    // const journalParams =
    //   this.filterValue === 'personal'
    //     ? {
    //         userID: this.user.userID,
    //         category: this.categoryValue
    //       }
    //     : {
    //         category: this.categoryValue
    //       };
    // const imageParams = {};
    // this.journalList = [];
    // this.fetchTravelJournal(journalParams, imageParams);
  }

  // wishlistClick(wishlist: WishList){
  //   this.utilsSvc.navigateForward(
  //     {
  //       wishlist: JSON.stringify(wishlist)
  //     },
  //   );
  // }

  // async delWishList(wishlist: WishList) {
  //   const alert = await this.utilsSvc.confirmAlert(
  //     'Delete Plan',
  //     wishlist.name + ' will be deleted.',
  //     'Cancel',
  //     () => {},
  //     'Okay',
  //     async () => this.delWishListClick(wishlist)
  //   );
  //   await alert.present();
  // }

  // async delWishListClick(wishlist: WishList) {
  //   const loadingPopup = await this.utilsSvc.presentLoading('Deleting travel plan...');
  //   concat(
  //     this.wishlistSvc.delTravelPlanByIDs(travelPlan.travelPlanID, travelPlan.userID),
  //     this.wishlistSvc.getTravelPlansByUserID(this.user.userID)
  //   )
  //     .pipe(toArray())
  //     .subscribe(
  //       async results => {
  //         await this.delTravelPlanResult(results, false);
  //       },
  //       async e => await this.utilsSvc.presentAsyncErrorToast(e),
  //       () => loadingPopup.dismiss()
  //     );
  // }

}
