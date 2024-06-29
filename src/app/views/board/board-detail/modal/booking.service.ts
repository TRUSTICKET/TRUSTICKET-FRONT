import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  
  private orderNumberSubject = new BehaviorSubject<number>(0); // 초기값 설정
  orderNumber$ = this.orderNumberSubject.asObservable();

  constructor() {}

  setOrderNumber(newOrderNumber: number) {
    this.orderNumberSubject.next(newOrderNumber);
  }

  getOrderNumber() {
    return this.orderNumberSubject.value;
  }

  
}