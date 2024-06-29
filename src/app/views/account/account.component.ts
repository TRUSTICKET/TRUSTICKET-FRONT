import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BoardModel } from 'src/app/models/BoardModel';
import ResponseModel from 'src/app/models/ResponseModel';
import { UserRequestModel } from 'src/app/models/UserModel';
import { ApiService } from 'src/app/service/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  apiUrl = environment.apiHost;
  formData : FormData;
  insertForm: FormGroup;  //여러개의 FormControl을 다루기 위해 FormGroup 사용
  userReqModel : UserRequestModel;


  constructor(private apiService : ApiService, private fb: FormBuilder, private router : Router) { 
    this.insertForm = this.fb.group({   //유효성 체크.
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      nick: ['', [Validators.required]],
    });
    this.userReqModel = {} as UserRequestModel
  }

  ngOnInit() {
    
  }
  updateRequestForm(){
    const { email, password, nick } = this.insertForm.controls;
    this.userReqModel.email = email.value
    this.userReqModel.password = password.value
    this.userReqModel.name = nick.value
  }

  onSubmit(){
    this.updateRequestForm()
    console.log(this.userReqModel);
    this.apiService.post_api_request(`${this.apiUrl}/trusticket-core/api/v1/member/signup`, this.userReqModel)
    .subscribe((res : ResponseModel) => {
      if(res.success == true){
        console.log('성공');
        alert("회원 가입에 성공했습니다.")
        this.router.navigateByUrl('/');
      }
      else{
        console.log('회원 가입에 실패했습니다.');
      }
    });
  }

}
