import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';
import { PageService } from 'src/app/service/page.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogin : boolean;
  nick : string;
  constructor(private apiService : ApiService, public authService : AuthService, private router: Router, private pageService : PageService) { 

  }

  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }

  ngOnInit() {
    
  }

  logOut(){
    this.apiService.removeLoginToken();
    this.authService.logoutSet();
    alert('로그아웃 성공');
    this.pageService.moveTo('/');

  }



}
