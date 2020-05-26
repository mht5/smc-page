import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';

import { User } from 'src/app/core/models/user.model';
import { HttpService } from 'src/app/core/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  authenticated: boolean = false;
  user: BehaviorSubject<User> = new BehaviorSubject(null);
  userObservable = this.user.asObservable();
  admin: BehaviorSubject<boolean> = new BehaviorSubject(false);
  adminObservable = this.admin.asObservable();

  constructor(
    private httpService: HttpService
  ) { }

  setUser(user: User) {
    this.user.next(user);
    this.admin.next(user.admin);
  }

  getUser(): Observable<User> {
    return this.userObservable;
  }

  isAdmin(): Observable<boolean> {
    return this.adminObservable;
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  setUserInfo(userInfo) {
    this.setUser(userInfo['user']);
    this.httpService.addHeader('Access-Token', userInfo['accessToken']);
    this.authenticated = true;
  }

  login(loginInfo: Object): Observable<any[]> {
    var url = 'user/login';
    return this.httpService.post(url, loginInfo).pipe();
  }

  register(user: any): Observable<any[]> {
    var url = 'user/register';
    return this.httpService.post(url, user).pipe();
  }

  confirmRegistration(user: any): Observable<any[]> {
    var url = 'user/register-confirm';
    return this.httpService.post(url, user).pipe();
  }

  getUserById(userId: any) {
    var url = 'user/find-by-id?id=' + userId;
    return this.httpService.get(url).pipe();
  }

  updateUser(user: any): Observable<any[]> {
    var url = 'user/update';
    return this.httpService.post(url, user).pipe();
  }

}
