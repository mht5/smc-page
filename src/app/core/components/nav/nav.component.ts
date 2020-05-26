import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  authenticated: boolean = false;
  isAdmin: boolean;

  constructor(
    private router: Router,
    private userService: UserService
  ) {
    this.userService.getUser().subscribe(
      user => this.authenticated = user == undefined || user == null ? false : true
    );
    this.userService.isAdmin().subscribe(
      isAdmin => this.isAdmin = isAdmin
    );
  }

  ngOnInit() {
  }

  logout() {
    console.log('logout');
    var user: User = {
      'admin': false,
      username: '',
      email: '',
      confirmed: false
    }
    this.userService.setUser(user);
    this.router.navigate(['/login']);
  }

}
