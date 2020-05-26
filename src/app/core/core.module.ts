import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
  MatButtonModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatSelectModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDividerModule
} from '@angular/material';
import { ChartsModule } from 'ng2-charts';
import { NavComponent } from './components/nav/nav.component';
import { HeaderComponent } from './components/header/header.component';
import { MsgComponent } from './components/msg/msg.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RegisterSuccessComponent } from './components/register-success/register-success.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { RegisterConfirmComponent } from './components/register-confirm/register-confirm.component';
@NgModule({
  declarations: [
    NavComponent,
    HeaderComponent,
    MsgComponent,
    LoginComponent,
    RegisterComponent,
    RegisterSuccessComponent,
    UpdateProfileComponent,
    RegisterConfirmComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule,
    ChartsModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule,
    ChartsModule,
    NavComponent,
    HeaderComponent,
    MsgComponent
  ]
})
export class CoreModule { }
