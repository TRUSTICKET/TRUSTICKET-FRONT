import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Injectable } from '@angular/core';
import { concat, Observable, Observer } from 'rxjs';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserRequestModel } from '../models/UserModel';
import ResponseModel from '../models/ResponseModel';
import { catchError, map, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiHost: string;
  TOKEN_NAME = 'jwtauthToken';
  LOGIN_TOKEN = 'loginAuthToken'

  constructor(private router: Router, private http : HttpClient, private jwtHelper: JwtHelperService) {
    this.apiHost = environment.apiHost;
    this.http = http;
    console.log(this.apiHost);
  }

  //토큰 발급
  token_signin() {
    console.log('발급', this.apiHost);
    return this.http.post<ResponseModel>(`${this.apiHost}/auth/token`, {
        'origin': environment.clientHost,
        'clientSecret': environment.clientSecret,
    });
  }
  //클라이언트 단에 저장된 토큰 GET
  getToken(): string {
    console.log("getToken()", localStorage.getItem(this.TOKEN_NAME));
    return localStorage.getItem(this.TOKEN_NAME);
  }

  //클라이언트 단에 토큰 SET
  setToken(token: string) {
    console.log('setToken()');
    localStorage.setItem(this.TOKEN_NAME, token);
  }

  //클라이언트 단의 토큰 DELETE
  removeToken() {
    console.log('removeToken()');
    localStorage.removeItem(this.TOKEN_NAME);
  }

  //클라이언트 단의 토큰 유효기간 체크
  isTokenExpired(token: string) {
    console.log("tokenExpired");
    return this.jwtHelper.isTokenExpired(token);
  }


  public get_api_request<T> (url : string) : Observable<T>{
    try{
      return this.http.get<T>(url, {
        headers: {authorization: `Bearer ${this.getToken() || ''}`}
      });
    }
    catch(error){
      if(error.status === 419){
        console.log("토큰 만료", error);
      }
      else{
        console.log("서버 오류 or 유효하지 않은 사용자", error);
        return error.response;
      }
    }
  }

  public post_api_request<T> (url : string, data) : Observable<T>{
    try{
      return this.http.post<T>(url, data, {
        headers: {Authorization: `Bearer ${this.getToken() || ''}`}
      });
    }
    catch(error){
      if(error.status === 419){
        console.log("토큰 만료", error);
        return this.post_api_request(url, data);
      }
      else{
        console.log("서버 오류 or 유효하지 않은 사용자", error);
        return error.response;
      }
    }
  }

  /* Login Auth API Reqeust */

  //로그인 토큰 발급
  login_signin(user : UserRequestModel) {
    return this.http.post<ResponseModel>(`${this.apiHost}/trusticket-core/api/v1/member/signin`, {
        'email': user.email,
        'password': user.password,
    });
  }

  //클라이언트 단에 저장된 토큰 GET
  getLoginToken(): string {
    return localStorage.getItem(this.LOGIN_TOKEN);
  }

  //클라이언트 단에 토큰 SET
  setLoginToken(token: string) {
    if(token){
      console.log('setToken()', token);
      localStorage.setItem(this.LOGIN_TOKEN, token);
    }
  }

  //클라이언트 단의 토큰 DELETE
  removeLoginToken() {
    localStorage.removeItem(this.LOGIN_TOKEN);
  }

  //클라이언트 단의 토큰 유효기간 체크
  isLoginTokenExpired(token: string) {
    const isExpire = this.jwtHelper.isTokenExpired(token);
    if(isExpire){
      this.removeLoginToken();
    }
    return isExpire;
  }

  //로그인 요청
  public login_api (user : UserRequestModel) : Observable<ResponseModel>{
    try{
      return new Observable<ResponseModel>((observer: Observer<ResponseModel>) => {
        this.login_signin(user) //1. 토큰 발급
        .subscribe((result : ResponseModel) => {  //2. 토큰 발급 완료 시 토큰 세팅
          this.setLoginToken(result.response);            
          observer.next(result); //4. 요청 완료 시 observer를 반응시킴(값 변환시점)
          observer.complete();
        }, (error) => {                         
          observer.next(error);
          observer.complete();
        });
      });      
    }
    catch(error){
      console.log("인증 실패", error);
      return new Observable<ResponseModel>((observer: Observer<ResponseModel>) => {      
        observer.next({
          success : false
        } as ResponseModel); 
        observer.complete();
      });
    }
  }

  //GET Reqeust with Login Auth
  public get_api_request_signin (url : string) : Observable<ResponseModel>{
    try{
      if(this.getLoginToken() == undefined || this.getLoginToken() == null || this.isLoginTokenExpired(this.getLoginToken())){
        this.router.navigate(['login']);
        return;
      }
      return this.http.get<ResponseModel>(url, {
        headers: {authorization: `Bearer ${this.getLoginToken() || ''}`}
      })
  
    }
    catch(error){
      if(error.status === 419){
        console.log("토큰 만료", error);
        return error.response;
      }
      else{
        console.log("서버 오류 or 유효하지 않은 사용자", error);
        return error.response;
      }
    }
  }

  public post_api_request_signin (url : string,  data) : Observable<ResponseModel>{
    try{
      if(this.getLoginToken() == undefined || this.getLoginToken() == null || this.isLoginTokenExpired(this.getLoginToken())){
        return;
      }
      return this.http.post<ResponseModel>(url, data,{
        headers: {authorization: `Bearer ${this.getLoginToken() || ''}`}
      })
  
    }
    catch(error){
      if(error.status === 419){
        console.log("토큰 만료", error);
        return error.response;
      }
      else{
        console.log("서버 오류 or 유효하지 않은 사용자", error);
        return error.response;
      }
    }
  }
  
}
