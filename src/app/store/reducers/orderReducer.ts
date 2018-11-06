import { IOrder } from "src/app/models/order";
import * as OrderActions from '../actions/orderActions'

export interface IOrderState {
  orders: IOrder[]
}

const initialState: IOrderState = {
  orders: []
};

export function orderReducer(state: IOrderState = initialState, action: OrderActions.Actions) : IOrderState {

  switch (action.type) {
    case OrderActions.LOAD_ORDERS:
      return state;
    case OrderActions.LOAD_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload
      }
    case OrderActions.LOAD_ORDERS_FAIL:
      return state;
    default:
      return state;
  }

}
