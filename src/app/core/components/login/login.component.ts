import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  login() {
    console.log('login: ', this.username + ', ' + this.password);
    this.router.navigate(['/stock-exchange']);
  }

  clear() {
    this.username = '';
    this.password = '';
  }

  register() {
    this.router.navigate(['/register']);
  }

}
