import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { HOST } from '@angular/core/src/render3/interfaces/view';
import { ActivatedRoute, Router } from '@angular/router';
import { BoardModel } from 'src/app/models/BoardModel';
import { BookingModel } from 'src/app/models/BookingModel';
import PageModel from 'src/app/models/PageModel';
import ResponseModel from 'src/app/models/ResponseModel';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-myticket',
  templateUrl: './myticket.component.html',
  styleUrls: ['./myticket.component.css']
})
export class MyticketComponent implements OnInit {
  apiUrl : string = environment.apiHost;
  tickets : BookingModel[];
  pager : PageModel;
  searchKeyword : string = '';
  prefix : number = 3;

  constructor(private route : ActivatedRoute, private apiService : ApiService, private router : Router,
    private authService : AuthService,
  ) { 

  }
  ngOnInit() {
    this.pager = {
      pageSize: 2,
      maxSize: 5,
    } as PageModel
    this.getList()
  }


  getList(){
    const memberId = this.authService.getId();
    const booking$ = this.apiService.get_api_request_signin(`${this.apiUrl}/trusticket-booking/api/v1/booking//member/${memberId}`);
    booking$.subscribe((res : ResponseModel) => {
      if(res.success = true){
        this.tickets = res.response;
        this.tickets.forEach(x => {
          const ticket$ = this.apiService.get_api_request_signin(`${this.apiUrl}/trusticket-content/api/v1/content/${x.eventId}`);
          ticket$.subscribe((res : ResponseModel) => {
            x.eventTitle = res.response.title
            x.eventThumbnail = this.loadImg(res.response.thumbnailImage)
            x.price = res.response.price
          });
        })
      }
    });
    
  }

  loadImg(filename : string) {
    if(filename == null || filename == undefined){
      return 'assets/img/lazyImage.jpg';
    }
    return `http://localhost:8000/trusticket-resources/file/${filename}`;
  }

  detail_view(id : number){
    console.log("detail")
    this.router.navigateByUrl(`/board/${id}`);
  }



  requestPay(event_tite: String, price : number, booking_id : number){
    const member_id = this.authService.getId();
    console.log(price)

    // @ts-ignore
    const { IMP } = window; // 생략 가능
    
    IMP.init("imp44240506"); // 예: imp00000000a
    IMP.request_pay(
      {
        pg: "html5_inicis", //PG사
        pay_method: "card", //결제방식
        name: "[TRUSTICKET] " + event_tite,
        amount: price, // 숫자 타입
        buyer_email: this.authService.getNick(),
      },
      (rsp) => {
        // callback
        console.log(rsp);
        if (rsp.success) {
          this.paymentProcess(rsp.imp_uid, booking_id, price);
        } else {
          alert("결제에 문제가 생겼습니다");
        }
      }
    );
  }

  refreshPage() {
    this.router.navigate([this.router.url])
      .then(() => {
        window.location.reload();
      });
  }

  paymentProcess(impUid : String, booking_id : number, price : number){
    const result$ = this.apiService.post_api_request_signin(`${this.apiUrl}/trusticket-payment/api/v1/payment`, {
      'impUid': impUid,
      'memberId': this.authService.getId(),
      'bookingId': booking_id,
      'amount': price,
    })
    result$.subscribe((res : ResponseModel) => {
      if(res.success = true){
        alert("결제 성공");
        this.refreshPage();
      }
      else{
        alert("결제에 문제가 생겼습니다");
      }
    });
  }
}
