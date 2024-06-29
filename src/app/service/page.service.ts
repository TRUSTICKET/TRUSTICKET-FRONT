import { Injectable, NgZone } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class PageService {

  lastEnteredMenu: any;

  constructor(private router: Router, public zone: NgZone) {

  }


  moveTo(url: string) {
    this.zone.run(() => {
      console.log(`[pageService] [moveTo] Move to ${url}`);
      this.router.navigate([url]);
    });
  }


}

