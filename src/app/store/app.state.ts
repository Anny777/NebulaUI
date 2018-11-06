import { IOrderState } from "./reducers/orderReducer";

export interface IAppState{
  readonly orders: IOrderState
}
