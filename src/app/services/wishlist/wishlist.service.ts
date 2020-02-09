import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import apisConfigs from '../../configs/apiConfigs';
import { httpConfigs } from 'src/app/configs/httpConfigs';
import WishList from '../../interfaces/wishList';
import { Observable, zip } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  constructor(private http: HttpClient) {}

  createWishList(wishList: WishList): Observable<any> {
    const postData = JSON.stringify(wishList);
    return this.http.post(apisConfigs.post.createWishList, postData, httpConfigs);
  }

  getWishList(params: Object): Observable<any> {
    if (Object.keys(params).length > 0) {
      let query = apisConfigs.get.getWishList;
      for (let param in params) {
        if (!query.includes('?')) {
          query += `?${param}=${params[param]}`;
        } else {
          query += `&${param}=${params[param]}`;
        }
      }
      return this.http.get(query, httpConfigs);
    } else {
      return this.http.get(apisConfigs.get.getWishList, httpConfigs);
    }
  }

  updateWishList(wishList: WishList): Observable<any> {
    const putData = JSON.stringify(wishList);
    return this.http.put(apisConfigs.put.updateWishList, putData, httpConfigs);
  }

  deleteWishList(wishListID: number, userID: number): Observable<any> {
    httpConfigs.body = {
      wishListID,
      userID
    };
    return this.http.delete(apisConfigs.delete.deleteWishList, httpConfigs);
  }
}
