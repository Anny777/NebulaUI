import { IOrderState } from "./order/order.Reducer";
import { ICookingDishState } from "./cookingDish/cookingDish.Reducer";
import { IAuthState } from "./Auth/auth.Reducer";

export interface IAppState{
  readonly orders: IOrderState,
  readonly cookingDishes: ICookingDishState,
  readonly user: IAuthState
}
