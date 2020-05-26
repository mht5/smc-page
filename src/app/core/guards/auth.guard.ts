import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from 'src/app/core/services/user.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {

   constructor(
    private router: Router,
    private userService: UserService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log('AuthGuard#canActivate called');
    if (!this.userService.isAuthenticated()) {
      console.log('not logged in.');
      this.router.navigate(['/login']);
    } else {
      return true;
    }
  }
}
