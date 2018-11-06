import { IOrder } from "src/app/models/order";
import * as OrderActions from '../actions/orderActions'

export interface IOrderState {
  orders: IOrder[]
}

const initialState: IOrderState = {
  orders: []
};

export function orderReducer(state: IOrderState = initialState, action: OrderActions.Actions) {
  switch (action.type) {
    case OrderActions.LOAD_ORDERS:
      return {
        ...state,
        orders: action.payload
      }

    default:
      return state;
  }

}
