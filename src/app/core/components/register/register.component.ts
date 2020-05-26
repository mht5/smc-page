import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';

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
    'admin': false,
    'confirmed': false
  };
  username = new FormControl('', [Validators.required, Validators.maxLength(30)]);
  email = new FormControl('', [Validators.required, Validators.email, Validators.maxLength(100)]);
  mobileNumber = new FormControl('', [Validators.maxLength(11)]);

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  validateInput(): boolean {
    document.getElementById('username').click();
    document.getElementById('email').click();
    document.getElementById('mobileNumber').click();
    if (this.username.errors != null || this.email.errors != null || this.mobileNumber.errors != null) {
      return false;
    }
    return true;
  }

  register() {
    if (this.validateInput()) {
      console.log('register: ', this.user);
      this.userService.register(this.user).subscribe(
        data => {
          console.log(data);
          this.router.navigate(['/register-success']);
        },
        err => {
          console.log(err);
        }
      )
    } 
    this.router.navigate(['/register-success']);
  }

  clear() {
    this.user = {
      'username': null,
      'email': null,
      'mobileNumber': null,
      'admin': false,
      'confirmed': false
    };
  }

}
