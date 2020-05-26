import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Md5 } from 'ts-md5';

import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { DisplayService } from 'src/app/core/services/display.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  title: string = 'Update User Profile';
  user: User = {
    'id': 84759182,
    'username': 'mohan',
    'email': 'mhtang@google.com',
    'mobileNumber': '123456',
    'admin': false,
    'confirmed': true
  };
  username = new FormControl('', [Validators.required, Validators.maxLength(30)]);
  mobileNumber = new FormControl('', [Validators.maxLength(11)]);
  password = new FormControl('', [Validators.maxLength(30)]);
  confirmPassword = new FormControl('', [Validators.maxLength(30)]);
  constructor(
    private userService: UserService,
    private displayService: DisplayService
  ) { }

  ngOnInit() {
    this.getUserInfo();
    this.displayService.setMsg([]);
  }

  getUserInfo(): void {
    this.userService.getUser().subscribe(
      data => {
        this.user = data;
      }
    )
  }

  validateInput(): boolean {
    document.getElementById('username').click();
    document.getElementById('mobileNumber').click();
    document.getElementById('password').click();
    document.getElementById('confirmPassword').click();
    if (this.username.errors != null || this.mobileNumber.errors != null || this.password.errors != null || this.confirmPassword.errors != null) {
      return false;
    } else if (this.confirmPassword.value != this.password.value) {
      this.displayService.setMsg(['error', 'The password you entered does not match, please enter again.']);
      return false;
    }
    return true;
  }

  update() {
    if (this.validateInput()) {
      this.displayService.setMsg([]);
      if (this.password.value.length > 0) {
        this.user['password'] = Md5.hashStr(this.password.value).toString();
      } 
      console.log('updating user profile: ', this.user);
      this.userService.updateUser(this.user).subscribe(
        data => {
          console.log(data);
          if (data) {
            this.displayService.setMsg(['success', 'You have successfully updated your profile.']);
          }
        },
        err => {
          console.log(err);
        }
      )
    }
  }

  clear() {
    /* this.user = {
      'id': 84759182,
      'username': 'mohan',
      'email': 'mhtang@google.com',
      'mobileNumber': '123456',
      'admin': false,
      'confirmed': true
    }; */
    this.getUserInfo();
    this.password.setValue(undefined);
    this.confirmPassword.setValue(undefined);
  }

}
