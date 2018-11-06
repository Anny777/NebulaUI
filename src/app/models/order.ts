import { Dish } from "./dish";

export interface IOrder {
  Id: number;
  Dishes: Dish[];
  Table: number;
  CreatedDate: Date;
}


