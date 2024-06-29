import { ChangeDetectorRef, Component, Inject, Input, NgZone, OnDestroy, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { BookingService } from './booking.service';
import { ApiService } from 'src/app/service/api.service';
import { environment } from 'src/environments/environment';
import ResponseModel from 'src/app/models/ResponseModel';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-booking-modal',
  templateUrl: './booking-modal.component.html'
})
export class BookingModalComponent implements OnDestroy {

  @Input() offsetId: number;
  waitingNo: number;
  apiUrl : string = environment.apiHost;
  private subscription: Subscription;

  constructor(private bookingService: BookingService, 
    private ngZone : NgZone, 
    private apiService : ApiService,
    @Inject(MAT_DIALOG_DATA) public data: { offsetId: number },
    private dialogRef: MatDialogRef<BookingModalComponent>) {

    // 서비스를 통해 초기값 설정
    this.offsetId = data.offsetId;
    this.waitingNo = this.bookingService.getOrderNumber();

    // 서비스의 변경 사항 구독
    this.subscription = this.bookingService.orderNumber$.subscribe(orderNumber => {
      this.ngZone.run(() => {
        this.waitingNo = orderNumber;
      });
     
      console.log("subscribe " + this.waitingNo);
      console.log("offset:" + this.offsetId);
    });
  }

  cancel(){
    const result$ = this.apiService.post_api_request_signin(`${this.apiUrl}/trusticket-core/api/v1/booking/cancel`, {
        offsetId: this.offsetId,
    });
    result$.subscribe((res : ResponseModel) => {
      console.log("EXIT")
      this.dialogRef.close();
    });
  
  }


  ngOnDestroy() {
    // 구독 해제
    this.subscription.unsubscribe();
  }
}