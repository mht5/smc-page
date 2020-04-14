import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isAdmin: boolean;
  constructor(private userService: UserService) {
    this.isAdmin = this.userService.isAdmin();
  }

  ngOnInit() {
  }

}
