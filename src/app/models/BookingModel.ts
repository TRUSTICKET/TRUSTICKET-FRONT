import { UserModel } from "./UserModel";

export interface BookingModel{
  bookingId?: number;
  eventId?: number;  
  memberId? : number;
  paymentId?: number;
  status?: string;
  eventTitle?: String;
  eventThumbnail?: String;
  price? : number
}  

