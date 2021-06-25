export interface IOrder {
  id: string;
  tableNumber: number;
  createdDate: Date;
  comment: string;
  isExportRequested: boolean;
  readyDishesCount: number;
}


