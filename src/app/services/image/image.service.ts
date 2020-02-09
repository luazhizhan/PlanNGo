import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import apisConfigs from '../../configs/apiConfigs';
import { httpConfigs } from 'src/app/configs/httpConfigs';
import { Observable, zip } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor(private http: HttpClient) {}

  getImage(params: Object): Observable<any> {
    if (Object.keys(params).length > 0) {
      let query = apisConfigs.get.getImage;
      for (let param in params) {
        if (!query.includes('?')) {
          query += `?${param}=${params[param]}`;
        } else {
          query += `&${param}=${params[param]}`;
        }
      }
      return this.http.get(query, httpConfigs);
    } else {
      return this.http.get(apisConfigs.get.getImage, httpConfigs);
    }
  }
}
