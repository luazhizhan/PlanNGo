import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apisConfigs } from '../configs/apiConfigs';
import { httpConfigs } from '../configs/httpConfigs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, pwd: string): Observable<object> {
    const postData = JSON.stringify({
      username,
      pwd
    });
    return this.http.post(apisConfigs.login, postData, httpConfigs);
  }
}
