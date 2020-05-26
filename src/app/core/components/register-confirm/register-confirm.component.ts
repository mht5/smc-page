import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { Md5 } from 'ts-md5';

import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { DisplayService } from 'src/app/core/services/display.service';

@Component({
  selector: 'app-register-confirm',
  templateUrl: './register-confirm.component.html',
  styleUrls: ['./register-confirm.component.css']
})
export class RegisterConfirmComponent implements OnInit {
  userId: string;
  user: User;
  password = new FormControl('', [Validators.required, Validators.maxLength(30)]);
  confirmPassword = new FormControl('', [Validators.required, Validators.maxLength(30)]);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private displayService: DisplayService
  ) { }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.getUserById(this.userId);
  }

  getUserById(userId): void {
    this.userService.getUserById(userId).subscribe(
      data => {
        console.log(data);
        this.user = data;
      },
      err => {
        console.log(err);
      }
    )
    /*return {
      'id': 84759182,
      'username': 'mohan',
      'email': 'mhtang@google.com',
      'mobileNumber': '123456',
      'admin': false,
      'confirmed': false
    };*/
  }

  validateInput(): boolean {
    document.getElementById('password').click();
    document.getElementById('confirmPassword').click();
    if (this.password.errors != null || this.confirmPassword.errors != null) {
      return false;
    } else if (this.confirmPassword.value != this.password.value) {
      this.displayService.setMsg(['error', 'The password you entered does not match, please enter again.']);
      return false;
    }
    return true;
  }

  sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  confirm() {
    if (this.validateInput()) {
      this.user['password'] = Md5.hashStr(this.password.value).toString();
      console.log('confirm user registration: ', this.user);
      this.userService.confirmRegistration(this.user).subscribe(
        data => {
          console.log(data);
          if (data) {
            this.displayService.setMsg(['success', 'You have confirmed your registration, going to login page in 3 seconds...']);
            this.sleep(3000).then(() => {
              this.router.navigate(['/login']);
            })
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
      'confirmed': false
    };
    this.password = undefined;
    this.confirmPassword = undefined; */
    this.user.password = undefined;
    this.password.setValue('');
    this.confirmPassword.setValue('');
  }

}
