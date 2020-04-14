import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';

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
    'isAdmin': 'N',
    'confirmed': 'Y'
  };
  newPassword: string;
  confirmPassword: string;
  constructor() { }

  ngOnInit() {
  }

  update() {
    if (this.newPassword != undefined && this.confirmPassword != this.newPassword) {
      alert('The password you entered does not match, please enter again.');
    } else {
      this.user['password'] = this.newPassword;
      console.log('updating user profile: ', this.user);
    }
  }

  clear() {
    this.user = {
      'id': 84759182,
      'username': 'mohan',
      'email': 'mhtang@google.com',
      'mobileNumber': '123456',
      'isAdmin': 'N',
      'confirmed': 'Y'
    };
    this.newPassword = undefined;
    this.confirmPassword = undefined;
  }

}
