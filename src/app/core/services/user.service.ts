import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  admin: boolean = false;

  constructor() { }

  isAdmin(): boolean {
    return this.admin;
  }

}
