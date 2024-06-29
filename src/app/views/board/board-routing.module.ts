import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { BoardDetailComponent } from './board-detail/board-detail.component';
import { BoardListComponent } from './board-list/board-list.component';
import { BoardComponent } from './board.component';

const routes: Routes = [
  {
    path : 'board', component: BoardComponent,  canActivate: [AuthGuard] , 
    children:[
      {path : '', component: BoardListComponent,  canActivate: [AuthGuard] , },
      {path : 'list', component: BoardListComponent,  canActivate: [AuthGuard] , },
      {path : ':id', component: BoardDetailComponent,  canActivate: [AuthGuard] , },
    ]
  },  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoardRoutingModule { }



