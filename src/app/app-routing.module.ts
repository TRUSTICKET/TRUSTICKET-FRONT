import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './views/account/account.component';
import { BoardComponent } from './views/board/board.component';
import { LoginComponent } from './views/login/login.component';
import { MainComponent } from './views/main/main.component';
import {  AuthGuard  } from  './auth/auth.guard';
import { LoginCheckGuard } from './auth/login-check.guard';
import { MyticketComponent } from './views/myticket/myticket.component';

const routes: Routes = [
  {path : '', component: MainComponent, canActivate: [LoginCheckGuard]},  
  {path : 'account', component: AccountComponent, canActivate: [LoginCheckGuard] },  
  {path : 'login', component: LoginComponent, canActivate: [LoginCheckGuard]},  
  {path : 'myticket', component: MyticketComponent, canActivate: [AuthGuard]},  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
