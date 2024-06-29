import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { HOST } from '@angular/core/src/render3/interfaces/view';
import { ActivatedRoute, Router } from '@angular/router';
import { BoardModel } from 'src/app/models/BoardModel';
import PageModel from 'src/app/models/PageModel';
import ResponseModel from 'src/app/models/ResponseModel';
import { ApiService } from 'src/app/service/api.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.css']
})
export class BoardListComponent implements OnInit{
  apiUrl : string = environment.apiHost;
  boards : BoardModel[];
  pager : PageModel;
  searchKeyword : string = '';
  prefix : number = 3;

  constructor(private route : ActivatedRoute, private apiService : ApiService, private router : Router) { 

  }
  ngOnInit() {
    this.pager = {
      pageSize: 2,
      maxSize: 5,
    } as PageModel
    //this.pagingList(pager);
  }
  
  search(){
    this.getList(1)
  }

  getList(curPage : number){
    const page = curPage - 1;
    const boards$ = this.apiService.get_api_request_signin(`${this.apiUrl}/trusticket-content/api/v1/content/title/${this.searchKeyword}?page=${page}&size=${this.pager.pageSize}`);
    boards$.subscribe((res : ResponseModel) => {
      if(res.success = true){
        this.boards = res.response.data;
        this.pager.collectionSize = res.response.pageInfo.totalElements;   
        this.pager.maxSize = res.response.pageInfo.totalPages;   
      }
    });
  }

  detail_view(id : number){
    this.router.navigateByUrl(`/board/${id}?page=${this.pager.page}`);
  }

  pageChanged(page : number){
    console.log(page);
    this.pager.page = page;
    this.getList(page);
  }

  loadImg(filename : string) {
    if(filename == null || filename == undefined){
      return 'assets/img/lazyImage.jpg';
    }
    return `http://localhost:8000/trusticket-resources/file/${filename}`;
  }
}
