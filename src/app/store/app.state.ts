import { IOrderState } from "./reducers/orderReducer";
import { IDishState } from "./reducers/dishReducer";

export interface IAppState{
  readonly orders: IOrderState,
  readonly dishes: IDishState
}
