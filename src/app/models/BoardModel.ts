export interface BoardModel{
  id?: number;
  title?: string;   
  schedule? : string;
  place? : string;
  thumbnailImage? : string;
  startDate? : Date;
  endDate? : Date;
}  

export interface BoardDetailModel {
  id?: number;
  title?: string;   
  schedule? : string;
  place? : string;
  thumbnailImage? : string;
  startDate? : Date;
  endDate? : Date;
  max_stock?: number;
  mainImage?: string;   
  price? : number;
  content? : string;

}  

