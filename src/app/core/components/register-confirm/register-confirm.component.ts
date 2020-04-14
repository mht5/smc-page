import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-register-confirm',
  templateUrl: './register-confirm.component.html',
  styleUrls: ['./register-confirm.component.css']
})
export class RegisterConfirmComponent implements OnInit {
  userId: string;
  user: User;
  password: string;
  confirmPassword: string;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.user = this.getUserById(this.userId);
  }

  getUserById(userId): User {
    return {
      'id': 84759182,
      'username': 'mohan',
      'email': 'mhtang@google.com',
      'mobileNumber': '123456',
      'isAdmin': 'N',
      'confirmed': 'N'
    };
  }

  confirm() {
    if (this.password == undefined || this.confirmPassword == undefined) {
      alert('Please set your password.');
    } else if (this.confirmPassword != this.password) {
      alert('The password you entered does not match, please enter again.');
    } else {
      this.user['password'] = this.password;
      console.log('confirm user registration: ', this.user);
    }
  }

  clear() {
    this.user = {
      'id': 84759182,
      'username': 'mohan',
      'email': 'mhtang@google.com',
      'mobileNumber': '123456',
      'isAdmin': 'N',
      'confirmed': 'N'
    };
    this.password = undefined;
    this.confirmPassword = undefined;
  }

}
