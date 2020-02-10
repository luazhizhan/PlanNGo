import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import  WishList  from 'src/app/interfaces/wishlist';
import { WishListService } from '../../services/wishlist/wishlist.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-wishlist-detail',
  templateUrl: './wishlist-detail.page.html',
  styleUrls: ['./wishlist-detail.page.scss'],
})
export class WishlistDetailPage implements OnInit {

  wishlistDetail: WishList;
  travelPlanID:0

  constructor(
    private wishlistservice: WishListService,
    private activatedRoute: ActivatedRoute
    ) { 
      const wishlistID = activatedRoute.snapshot.params["wishlistID"]
      console.log(wishlistID);
      // this.wishlistDetail = wishlistservice.getWishListByID(wishlistID);
      
      wishlistservice.getWishListByID(wishlistID).subscribe((list) => {
        this.wishlistDetail = list.results[0];
        console.log(this.wishlistDetail.name,"wishlist detail");
      })
    }

  async ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params=>{
      if(Object.keys(params).length){
        this.travelPlanID=JSON.parse(params.travelPlanID);
      }
    })
    // const wishlistID = this.activatedRoute.snapshot.params["wishlistID"]
    // this.wishlistservice.getWishListByID(wishlistID).subscribe(
    //   this.wishlistDetail = this.wishlistDetail
    // )
  }

  async onAddToItinerary() {
    const params= {
      wishlistID:this.wishlistDetail.wishlistID
    }
    const data= {
      travelPlanID:this.travelPlanID
    }
    console.log(this.wishlistDetail)
    this.wishlistservice.updateWishList(data,params).subscribe(

    )
  }
}
