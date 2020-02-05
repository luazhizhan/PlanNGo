import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import apisConfigs from '../../configs/apiConfigs';
import { httpConfigs } from 'src/app/configs/httpConfigs';
import WishList from '../../interfaces/wishlist';
import { Observable, zip } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishListService {
  constructor(private http: HttpClient) {}

  createWishList(wishlist: WishList): Observable<any> {
    const postData = JSON.stringify(wishlist);
    return this.http.post(apisConfigs.post.createWishList, postData, httpConfigs);
  }

  getWishList(): Observable<any>{
    return this.http.get(apisConfigs.get.getWishList);
  }

}
