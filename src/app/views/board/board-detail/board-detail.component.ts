import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import { BoardDetailModel } from 'src/app/models/BoardModel';
import ResponseModel from 'src/app/models/ResponseModel';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BookingModalComponent } from './modal/booking-modal.component';
import { SseService } from 'src/app/service/sse.service';
import { BookingService } from './modal/booking.service';
import { MatSnackBar } from '@angular/material';
import { LargeAlertDialogComponent } from 'src/app/component/large-alert-dialog/large-alert-dialog.component';

@Component({
  selector: 'app-board-detail',
  templateUrl: './board-detail.component.html',
  styleUrls: ['./board-detail.component.css']
})
export class BoardDetailComponent implements OnInit {
  id : string;
  apiUrl = environment.apiHost;
  board : BoardDetailModel;
  page : number = 0;
  dialogRef : MatDialogRef<BookingModalComponent>;
  dialogLarge : MatDialogRef<LargeAlertDialogComponent>;
  
  constructor(private route : ActivatedRoute, private apiService : ApiService, private authService : AuthService, private dialog: MatDialog, private sseService: SseService,
    private zone: NgZone, private bookingService: BookingService, private snackBar: MatSnackBar
  ) { 
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.route.snapshot.queryParamMap.get('page')){
      this.page = Number(this.route.snapshot.queryParamMap.get('page'));
    }
    const board$ = this.apiService.get_api_request_signin(`${this.apiUrl}/trusticket-content/api/v1/content/${this.id}`);
    board$.subscribe((res : ResponseModel) => {
      if(res.success == true){
        this.board = res.response;
      }
    });
  }

  ngOnInit() {

  }

  booking(){
    const memberId = this.authService.getId();
    const result$ = this.apiService.post_api_request_signin(`${this.apiUrl}/trusticket-core/api/v1/booking/request`, {
        'id': this.board.id,
        'memberId': memberId
    });
    result$.subscribe((res : ResponseModel) => {
      if(res.success == true){
        const offset : number = res.response;
        const eventSource = this.sseService.getServerSentEvent(`${this.apiUrl}/trusticket-booking/sse/${res.response}`);

        this.dialogRef = this.dialog.open(BookingModalComponent, {
          width: '600px', // 원하는 너비로 설정
          height: '600px', // 원하는 높이로 설정
          disableClose: true,
          data: { offsetId: Number(offset)}
        });

        
        eventSource.onmessage = (event) => {
          const data = JSON.parse(event.data);
          const currentQueueNumber = data.message;
          let waitingAmount = Number(offset) - Number(currentQueueNumber);
          if(waitingAmount < 0){
            waitingAmount = 0
          }
          this.updateOrderNumber(waitingAmount)
          console.log(waitingAmount)

          if(Number(currentQueueNumber) >= offset){
            this.zone.run(() => {
              this.dialogRef.close();
              eventSource.close();
            });
            
            
            const bookingResult$ = this.apiService.get_api_request_signin(`${this.apiUrl}/trusticket-booking/api/v1/booking/status/${res.response}`);
            bookingResult$.subscribe((res : ResponseModel) => {
              console.log("Response" + res.response);
              this.handleBookingResult(res.response)
            })
            this.updateOrderNumber(0)
          }
        };

        

        eventSource.onerror = (error) => {
            this.zone.run(() => {
              this.dialogRef.close();
            });      
        };

        this.dialogRef.afterClosed().subscribe(result => {
          this.zone.run(() => {
            if(eventSource.readyState === eventSource.OPEN){
              eventSource.close();
            }  
          });      
        });
      }
    });
  }

  loadImg(filename : string) {
    if(filename == null || filename == undefined){
      return 'assets/img/lazyImage.jpg';
    }
    return `http://localhost:8000/trusticket-resources/file/${filename}`;
  }

  updateOrderNumber(newOrderNumber: number) {
    this.bookingService.setOrderNumber(newOrderNumber);
  }

  openSnack(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // 알림이 표시되는 시간 (밀리초)
      verticalPosition: 'top', // 세로 위치 설정: 'top' | 'bottom'
      horizontalPosition: 'right', // 가로 위치 설정: 'start' | 'center' | 'end' | 'left' | 'right'
      panelClass: ['center-snackbar'] // 커스텀 스타일 클래스 추가
    });
  }

  handleBookingResult(response: string): void {
    let message = '';
    if (response === "FAIL") {
      message = "인원을 초과하였습니다.";
    } else if (response === "EXIST") {
      message = "이미 티켓팅된 상품입니다.";
    } else if (response === "SUCCESS") {
      message = "예매를 맞추었습니다. 24시 이전에 결제를 완료해주세요.";
    }
    if (message) {
      this.openLargeAlert(message);
    }
  }

  openLargeAlert(message: string): void {
    this.dialogLarge = this.dialog.open(LargeAlertDialogComponent, {
      width: '600px', 
      height: '400px', 
      data: { message: message },
      disableClose: false 
    });

    this.dialogLarge.afterClosed().subscribe(() => {
      console.log("Dialog closed");
    });
  }

  
}


