import { UserModel } from "./UserModel";

export interface ChatModel{
  id?: number;
  content?: string;  
  createdAt? : Date;
  User: UserModel;
}  

export interface ChatRequestModel{
  uid: number;
  content?: string;  
}  
