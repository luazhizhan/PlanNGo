import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { WishListService } from '../../services/wishlist/wishlist.service';
import { UtilsService } from '../../services/utils/utils.service';
import WishList from 'src/app/interfaces/wishlist';

@Component({
  selector: 'app-wishlistmain',
  templateUrl: './wishlistmain.page.html',
  styleUrls: ['./wishlistmain.page.scss'],
})
export class WishlistmainPage implements OnInit {

  wishlists: WishList[];

  constructor(
    private authSvc: AuthService,
    private wishlistSvc: WishListService,
    private utilsSvc: UtilsService
  ) { }

  async ngOnInit() {
    console.log("wishlistmain");
    this.wishlistSvc.getWishList().subscribe(
      wishlists => {
        console.log(wishlists);
        this.wishlists = wishlists[0].results;
      },
      async e => await this.utilsSvc.presentAsyncErrorToast(e)
    );
  }

}
