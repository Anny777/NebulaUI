import { IOrder } from "src/app/models/order";
import { Action } from '@ngrx/store';

export const LOAD_ORDERS = '[Orders] Load';
export const LOAD_ORDERS_SUCCESS = '[Orders] Load success';
export const LOAD_ORDERS_FAIL = '[Orders] Load fail';

export const ADD_ORDER = '[Orders] Add';
export const ADD_ORDER_SUCCESS = '[Orders] Add success';
export const ADD_ORDER_FAIL = '[Orders] Add fail';

export const CLOSE_ORDER = '[Orders] Close';
export const CLOSE_ORDER_SUCCESS = '[Orders] Close success';
export const CLOSE_ORDER_FAIL = '[Orders] Close fail';


export class LoadOrders implements Action {
  readonly type = LOAD_ORDERS;
}

export class LoadOrdersSuccess implements Action {
  readonly type = LOAD_ORDERS_SUCCESS;
  constructor(public payload: IOrder[]) { }
}

export class LoadOrdersFail implements Action {
  readonly type = LOAD_ORDERS_FAIL;
  constructor(public payload: any) { }
}

export class AddOrder implements Action {
  readonly type = ADD_ORDER;
  constructor(public payload: IOrder) { }
}

export class AddOrderSuccess implements Action {
  readonly type = ADD_ORDER_SUCCESS;
}

export class AddOrderFail implements Action {
  readonly type = ADD_ORDER_FAIL;
  constructor(public payload: any) { }
}

export class CloseOrder implements Action {
  readonly type = CLOSE_ORDER;
  constructor(public payload: number) { }
}

export class CloseOrderSuccess implements Action {
  readonly type = CLOSE_ORDER_SUCCESS;
}

export class CloseOrderFail implements Action {
  readonly type = CLOSE_ORDER_FAIL;
  constructor(public payload: any) { }
}

export type Actions = LoadOrders | LoadOrdersSuccess | LoadOrdersFail | AddOrder | AddOrderSuccess | AddOrderFail | CloseOrder | CloseOrderSuccess | CloseOrderFail;
