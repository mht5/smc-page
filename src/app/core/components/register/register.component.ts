import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = {
    'username': null,
    'email': null,
    'mobileNumber': null,
    'isAdmin': 'N',
    'confirmed': 'N'
  };

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  register() {
    console.log('register: ', this.user);
    this.router.navigate(['/register-success']);
  }

  clear() {
    this.user = {
      'username': null,
      'email': null,
      'mobileNumber': null,
      'isAdmin': 'N',
      'confirmed': 'N'
    };
  }

}
