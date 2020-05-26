import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { Md5 } from 'ts-md5';

import { UserService } from 'src/app/core/services/user.service';
import { ConfigService } from 'src/app/core/services/config.service';
import { DisplayService } from 'src/app/core/services/display.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = new FormControl('', [Validators.required, Validators.email, Validators.maxLength(30)]);
  password = new FormControl('', [Validators.required, Validators.maxLength(30)]);

  constructor(
    private router: Router,
    private userService: UserService,
    private configService: ConfigService,
    private displayService: DisplayService
  ) { }

  ngOnInit() {
    this.displayService.setMsg([]);
    // this.username.setValue('user1@smc.com');
    // this.password.setValue('123qwe');
  }

  validateInput(): boolean {
    document.getElementById('username').click();
    document.getElementById('password').click();
    if (this.username.errors != null || this.password.errors != null) {
      return false;
    }
    return true;
  }

  login() {
    if (this.validateInput()) {
      var user = {
        'email': this.username.value,
        'password': Md5.hashStr(this.password.value).toString()
      };
      // console.log('login: ', user);
      this.displayService.setMsg([]);
      this.userService.login(user).subscribe(
        data => {
          // console.log(data);
          this.userService.setUserInfo(data);
          this.configService.initConfiguration();
          if (data['user']['admin']) {
            this.router.navigate(['/stock-exchange']);
          } else {
            this.router.navigate(['/company']);
          }
        },
        err => {
          console.log(err);
        }
      )
    }
  }

  clear() {
    this.username.setValue('');
    this.password.setValue('');
  }

  register() {
    this.router.navigate(['/register']);
  }

}
