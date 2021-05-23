import { IOrder } from "src/app/models/order";
import * as OrderActions from './order.Actions'
import { IDishLoading } from "src/app/models/dishLoading";
import { IDish } from "src/app/models/dish";
import { Action, createReducer, on } from '@ngrx/store';
import { closeOrder, closeOrderFail, closeOrderSuccess, commentOrder, commentOrderFail, commentOrderSuccess, createOrder, createOrderFail, createOrderSuccess, getOrder, getOrderFail, getOrderSuccess, loadOrders, loadOrdersFail, loadOrdersSuccess } from './order.Actions';

export interface IOrderState {
  isSoundActivated: boolean[],
  orders: IOrder[],
  isOrdersLoading: boolean,
  isOrderAdd: boolean,
  isOrderClose: boolean,
  isOrderExport: boolean,
  isOrderCreate: boolean,
  isOrderGet: boolean,
  isAddedComment: boolean,
  dishLoading: IDishLoading[]
}

const initialState: IOrderState = {
  isSoundActivated: [],
  orders: [],
  isOrdersLoading: false,
  isOrderAdd: false,
  isOrderClose: false,
  isOrderExport: false,
  isOrderCreate: false,
  isOrderGet: false,
  isAddedComment: false,
  dishLoading: []
};

function _getAudios(state: IOrderState) {
  let audios = [true];
  if (state.isSoundActivated.length < 500) {
    audios = Array.from(state.isSoundActivated);
    audios.push(true);
  }

  return audios;
}

const _reducer = createReducer(
  initialState,
  on(loadOrders, (state) => ({ ...state, isOrdersLoading: true })),
  on(loadOrdersSuccess, (state, action) => ({ ...state, isOrdersLoading: false, orders: action.orders })),
  on(loadOrdersFail, (state, action) => ({ ...state, isOrdersLoading: false })),

  on(createOrder, (state, action) => ({ ...state, isOrderCreate: true, table: action.table })),
  on(createOrderSuccess, (state, action) => ({ ...state, isOrderCreate: false, id: action.id })),
  on(createOrderFail, (state, action) => ({ ...state, isOrderCreate: false })),

  on(getOrder, (state, action) => ({ ...state, isOrderGet: true, id: action.id })),
  on(getOrderSuccess, (state, action) => ({ ...state, isOrderGet: false, order: action.order })),
  on(getOrderFail, (state, action) => ({ ...state, isOrderGet: false })),

  on(closeOrder, (state, action) => ({ ...state, isOrderClose: true, id: action.id })),
  on(closeOrderSuccess, (state, action) => ({ ...state, isOrderClose: false })),
  on(closeOrderFail, (state, action) => ({ ...state, isOrderClose: false })),

  on(commentOrder, (state, action) => ({ ...state, isAddedComment: true, id: action.id, comment: action.comment })),
  on(commentOrderSuccess, (state, action) => ({ ...state, isAddedComment: false })),
  on(commentOrderFail, (state, action) => ({ ...state, isAddedComment: false })),
);

export function orderReducer(state: IOrderState, action: Action): IOrderState {
  return _reducer(state, action);
}
