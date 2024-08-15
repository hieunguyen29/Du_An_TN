export interface IDiscount {
  id: number;
  discount_name: string;
  discount_condition: number;
  discount_code: string;
  percentage: number;
  expiry_date: string;
  minprice:number;
  trang_thai:number,
}