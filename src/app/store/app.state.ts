import { IOrderState } from "./reducers/orderReducer";
import { IDIshState } from "./reducers/dishReducer";

export interface IAppState{
  readonly orders: IOrderState,
  readonly dishes: IDIshState
}
