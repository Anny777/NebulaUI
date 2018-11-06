import { IOrder } from "src/app/models/order";
import * as OrderActions from '../actions/order'
const initialState: IOrder =
  {
    Id: 1,
    Dishes: [],
    Table: 1,
    CreatedDate: new Date()
  };

export function reducer(state: IOrder[] = [initialState], action: OrderActions.Actions) {
  switch (action.type) {
    case OrderActions.LOAD_ORDERS:
      return [
        ...state,
        action.payload
      ]

    default:
      return state;
  }

}
