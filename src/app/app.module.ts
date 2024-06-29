import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from './service/api.service';
import { JwtModule } from '@auth0/angular-jwt';
import { SharedModule } from './shared/shared.module';
import { MainComponent } from './views/main/main.component';
import { AccountComponent } from './views/account/account.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './views/login/login.component';
import { AuthService } from './service/auth.service';
import { PageService } from './service/page.service';
import { BoardModule } from './views/board/board.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SseService } from './service/sse.service';
import { MatDialogModule, MatSnackBarModule } from '@angular/material';
import { BookingModalComponent } from './views/board/board-detail/modal/booking-modal.component';
import { BookingService } from './views/board/board-detail/modal/booking.service';
import { LargeAlertDialogComponent } from './component/large-alert-dialog/large-alert-dialog.component';
import { MyticketComponent } from './views/myticket/myticket.component';

export function jwtTokenGetter(){
  return localStorage.getItem('token');
}
@NgModule({
  declarations: [ //컴포넌트, 디렉티브, 파이프의 리스트를 선언. 모듈에 선언된 구성요소는 모듈 내에서 사용 가능하다.
    AppComponent,
    MainComponent,
    AccountComponent,
    LoginComponent,
    BookingModalComponent,
    LargeAlertDialogComponent,
    MyticketComponent
  ],
  imports: [  //의존 관계의 앵귤러 라이브러리 모듈, 기능 모듈(하위 모듈), 라우팅 모듈, 서브 파티 모듈 등을 선언한다.
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,    
    JwtModule.forRoot({
      config: {
         tokenGetter: jwtTokenGetter,
         allowedDomains: ['localhost:4200', 'localhost:8080'],
      }
    }),
    BoardModule,  
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  providers: [  //providers : 서비스(Injectable object)의 리스트 선언. 루트 모듈에 선언된 서비스는 애플리케이션 전역에서 사용 가능하다.
    ApiService,
    AuthService,
    PageService,
    SseService,
    BookingService
  ],
  entryComponents: [BookingModalComponent, LargeAlertDialogComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA  //앵귤러 전용 태그 사용을 위한 스키마
  ],
  bootstrap: [AppComponent] //루트 모듈에서 사용하는 프로퍼티. 진입점인 루트 컴포넌트를 설정
})
export class AppModule { }
