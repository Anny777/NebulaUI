import { IOrderState } from "./reducers/orderReducer";
import { IDishState } from "./reducers/dishReducer";
import { ITable } from "../models/table";
import { IUser } from "../models/user";

export interface IAppState{
  readonly orders: IOrderState,
  readonly dishes: IDishState,
  readonly table: ITable,
  readonly user: IUser
}
