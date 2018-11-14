import { IOrder } from "src/app/models/order";
import { Action } from '@ngrx/store';

export const LOAD_ORDERS = '[Orders] Load';
export const LOAD_ORDERS_SUCCESS = '[Orders] Load success';
export const LOAD_ORDERS_FAIL = '[Orders] Load fail';

export const ADD_ORDER = '[Orders] Add';
export const CLOSE_ORDER = '[Orders] Close';

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


export class CloseOrder implements Action {
  readonly type = CLOSE_ORDER;
  constructor(public payload: number) { }
}

export type Actions = LoadOrders | LoadOrdersSuccess | LoadOrdersFail | AddOrder | CloseOrder;
