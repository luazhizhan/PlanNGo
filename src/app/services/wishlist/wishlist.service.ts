import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import apisConfigs from '../../configs/apiConfigs';
import { httpConfigs } from 'src/app/configs/httpConfigs';
import WishList from '../../interfaces/wishlist';
import { Observable, zip, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  base_path = "http://localhost:4200/wishlistmain/"

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  createWishList(wishlist: WishList): Observable<any> {
    console.log(wishlist,'wishlist')
    const postData = JSON.stringify(wishlist);
    return this.http.post(apisConfigs.post.createWishList, postData, httpConfigs);
  }

  getWishList(): Observable<any> {
    return this.http.get(apisConfigs.get.getWishList);
  }

  getWishLists(params:Object): Observable<any> {
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

  getWishListByID(wishlistID: number): Observable<any> {
    // return this.http.get<WishList>(detailAPI + '/' + wishlistID);
    return this.http.get(apisConfigs.get.getWishListByID + '?wishlistID=' + wishlistID, httpConfigs);
  }

  // deleteWishList(wishlistID: number): Observable<any>{
  //   httpConfigs.body = {
  //     wishlistID
  //   };
  //   return this.http.delete(apisConfigs.delete.deleteWishList,httpConfigs);
  // }

  deleteWishList(params: Object): Observable<any> {
    if (Object.keys(params).length > 0) {
      let query = apisConfigs.delete.deleteWishList;
      for (let param in params) {
        if (!query.includes('?')) {
          query += `?${param}=${params[param]}`;
        } else {
          query += `&${param}=${params[param]}`;
        }
      }
      return this.http.delete(query, httpConfigs);
    } else {
      return this.http.delete(apisConfigs.delete.deleteWishList, httpConfigs);
    }
  }

  // deleteWish(wishlistID){
  //   return this.http.delete<WishList>(this.base_path + '/' + wishlistID, this.httpOptions)
  //   .pipe(
  //     retry(2)
  //   )
  // }

  updateWishList(travelPlanID: Object, params: Object): Observable<any> {
    const postData = JSON.stringify(travelPlanID);
    if (Object.keys(params).length > 0) {
      let query = apisConfigs.put.updateWishList;
      for (let param in params) {
        if (!query.includes('?')) {
          query += `?${param}=${params[param]}`;
        } else {
          query += `&${param}=${params[param]}`;
        }
      }
      return this.http.put(query, postData, httpConfigs);
    } else {
      return this.http.put(apisConfigs.put.updateWishList, postData, httpConfigs);
    }
  }


  updateWishLists(wishList: WishList): Observable<any> {
    const putData = JSON.stringify(wishList);
    return this.http.put(apisConfigs.put.updateWishList, putData, httpConfigs);
  }

  deleteWishLists(wishListID: number, userID: number): Observable<any> {
    httpConfigs.body = {
      wishListID,
      userID
    };
    return this.http.delete(apisConfigs.delete.deleteWishList, httpConfigs);
  }
}



