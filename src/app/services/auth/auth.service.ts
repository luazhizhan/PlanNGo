import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import apisConfigs from '../../configs/apiConfigs';
import { httpConfigs } from '../../configs/httpConfigs';
import User from '../../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, pwd: string): Observable<any> {
    const postData = JSON.stringify({
      username,
      pwd
    });
    return this.http.post(apisConfigs.post.login, postData, httpConfigs);
  }

  getUserByUsernameOrEmail(username: string, email: string): Observable<any> {
    username = !username ? null : username;
    email = !email ? null : email;
    const queryStr = username + '/' + email;
    return this.http.get(apisConfigs.get.getUserByUsernameOrEmail + queryStr, httpConfigs);
  }

  saveUserInfo(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUserInfo(): any {
    return JSON.parse(localStorage.getItem('user'));
  }
}
