import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import ResponseModel from 'src/app/models/ResponseModel';
import { UserRequestModel } from 'src/app/models/UserModel';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  apiUrl = environment.apiHost;
  formData : FormData;
  insertForm: FormGroup;  //여러개의 FormControl을 다루기 위해 FormGroup 사용
  userReqModel : UserRequestModel;


  constructor(private apiService : ApiService, private fb: FormBuilder, private router : Router, private authService : AuthService) { 
    this.insertForm = this.fb.group({   //유효성 체크.
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    this.userReqModel = {} as UserRequestModel
  }

  ngOnInit() {
    
  }
  updateRequestForm(){
    const { email, password } = this.insertForm.controls;
    this.userReqModel.email = email.value
    this.userReqModel.password = password.value
  }

  onSubmit(){
    this.updateRequestForm()
    console.log(this.userReqModel);
    this.apiService.login_api(this.userReqModel)
    .subscribe((response : ResponseModel) => {
      if(response.success == true){
        console.log('성공');
        alert("로그인에 성공했습니다.")
        //login setting
        const token = this.apiService.getLoginToken();
        this.authService.loginSet(token);
        this.router.navigateByUrl('/');
      }
      else{
        alert("로그인에 실패했습니다.")
      }
    });
    
  }

}
