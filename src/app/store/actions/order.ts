import { IOrder } from "src/app/models/order";
import { Action } from '@ngrx/store';

export const LOAD_ORDERS = '[Orders] Load';
export const ADD_ORDER = '[Orders] Add';
export const CLOSE_ORDER = '[Orders] Close';

export class LoadOrders implements Action {
  readonly type = LOAD_ORDERS;
  constructor(public payload: IOrder[]) { }
}

export class AddOrder implements Action {
  readonly type = ADD_ORDER;
  constructor(public payload: IOrder) { }
}

export class CloseOrder implements Action {
  readonly type = CLOSE_ORDER;
  constructor(public payload: number) { }
}

export type Actions = LoadOrders | AddOrder | CloseOrder;
