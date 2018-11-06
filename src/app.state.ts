import { IOrder } from "./app/models/order";

export interface AppState {
  readonly orders: IOrder[];
}
