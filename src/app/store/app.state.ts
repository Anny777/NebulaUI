import { IOrderState } from "./order/order.Reducer";
import { IDishState } from "./dish/dishReducer";
import { IAuthState } from "./Auth/auth.Reducer";

export interface IAppState{
  readonly orders: IOrderState,
  readonly dishes: IDishState,
  readonly user: IAuthState
}
