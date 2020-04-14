import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from 'src/app/core/components/login/login.component';
import { RegisterComponent } from 'src/app/core/components/register/register.component';
import { RegisterSuccessComponent } from 'src/app/core/components/register-success/register-success.component';
import { UpdateProfileComponent } from 'src/app/core/components/update-profile/update-profile.component';
import { RegisterConfirmComponent } from 'src/app/core/components/register-confirm/register-confirm.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register-success', component: RegisterSuccessComponent },
  { path: 'register-confirm/:userId', component: RegisterConfirmComponent },
  { path: 'update-profile', component: UpdateProfileComponent },
  { path: 'stock-exchange', loadChildren: './stock-exchange/stock-exchange.module#StockExchangeModule' },
  { path: 'company', loadChildren: './company/company.module#CompanyModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
