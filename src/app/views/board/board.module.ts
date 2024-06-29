import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardDetailComponent } from './board-detail/board-detail.component';
import { BoardListComponent } from './board-list/board-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BoardComponent } from './board.component';
import { BoardRoutingModule } from './board-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'


@NgModule({
  declarations: [
    BoardComponent,
    BoardDetailComponent,
    BoardListComponent,
  ],
  imports: [
    BoardRoutingModule,
    BrowserModule, 
    HttpClientModule,
    CommonModule, //루트 모듈이 아니므로 CommonModule을 import해준다.
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    
  ],
  exports: [
    BoardComponent,
    BoardDetailComponent,
    BoardListComponent,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA  //앵귤러 전용 태그 사용을 위한 스키마
  ],
})
export class BoardModule { }
