import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogedIn : boolean;
  nick : string;
  id: number;

  constructor() { 
    this.isLogedIn = false;
    this.nick = "";
  }

  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }

  loginSet(token : string){
    this.isLogedIn = true;
    const decodedToken = this.getDecodedAccessToken(token);
    this.nick = decodedToken.email;
    this.id = decodedToken.memberId;
  }

  logoutSet(){
    this.isLogedIn = false;
    this.nick = "";
  }

  getId(){
    return this.id;
  }

  getNick(){
    return this.nick;
  }
}
