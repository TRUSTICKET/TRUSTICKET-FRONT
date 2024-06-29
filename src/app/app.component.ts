import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from './service/api.service';
import { AuthService } from './service/auth.service';
import { PageService } from './service/page.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'board-client';
  token: string;

  constructor(private apiService : ApiService, private pageService: PageService, private authService : AuthService){
    
  }

  ngOnInit(): void {

  }

  
}
 