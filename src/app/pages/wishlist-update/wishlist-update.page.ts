import { Component, OnInit } from '@angular/core';
import WishList from 'src/app/interfaces/wishlist';
import { WishListService } from '../../services/wishlist/wishlist.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-wishlist-update',
  templateUrl: './wishlist-update.page.html',
  styleUrls: ['./wishlist-update.page.scss'],
})
export class WishlistUpdatePage implements OnInit {

  wishlistupdate: WishList

  constructor(
    private wishlistservice: WishListService,
    private activatedRoute: ActivatedRoute
  ) { 
    const wishlistID = activatedRoute.snapshot.params["wishlistID"]
    console.log(wishlistID,'wishlist ID value');

    wishlistservice.getWishListByID(wishlistID).subscribe((list) => {
      this.wishlistupdate = list.results[0];
      console.log(this.wishlistupdate.name,"wishlist detail");
    })
  }

  ngOnInit() {
  }

}
