import { IDish } from "./dish";

export interface IOrder {
  Id: string;
  tableNumber: number;
  CreatedDate: Date;
  Comment: string;
  IsExportRequested: boolean;
  cookingDishes: IDish[];
}


