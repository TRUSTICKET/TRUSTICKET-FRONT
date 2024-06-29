export interface UserModel{
  id: number;
  email: string;   
  password?: string;  
  name? : string;
}  

export interface UserRequestModel{
  email: string;   
  password: string;  
  name : string;
}  

