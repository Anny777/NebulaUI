import { IOrder } from "src/app/models/order";
import { Action } from '@ngrx/store';
import { IDish } from "src/app/models/dish";

export const LOAD_ORDERS = '[Orders] Load';
export const LOAD_ORDERS_SUCCESS = '[Orders] Load success';
export const LOAD_ORDERS_FAIL = '[Orders] Load fail';

export const GET_ORDER = '[Order] Get';
export const GET_ORDER_SUCCESS = '[Order] Get success';
export const GET_ORDER_FAIL = '[Order] Get fail';

export const ADD_ORDER = '[Orders] Add';
export const ADD_ORDER_SUCCESS = '[Orders] Add success';
export const ADD_ORDER_FAIL = '[Orders] Add fail';

export const CLOSE_ORDER = '[Orders] Close';
export const CLOSE_ORDER_SUCCESS = '[Orders] Close success';
export const CLOSE_ORDER_FAIL = '[Orders] Close fail';

export const ADD_DISH = '[Orders] Add dish';
export const ADD_DISH_SUCCESS = '[Orders] Add dish success';
export const ADD_DISH_FAIL = '[Orders] Add dish fail';

export const REMOVE_DISH = '[Orders] Remove dish';
export const REMOVE_DISH_SUCCESS = '[Orders] Remove dish success';
export const REMOVE_DISH_FAIL = '[Orders] Remove dish fail';


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

export class GetOrder implements Action {
  readonly type = GET_ORDER;
  constructor(public payload: number) { }
}
export class GetOrderSuccess implements Action {
  readonly type = GET_ORDER_SUCCESS;
  constructor(public payload: IOrder) { }
}
export class GetOrderFail implements Action {
  readonly type = GET_ORDER_FAIL;
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

export class AddDish implements Action {
  readonly type = ADD_DISH;
  constructor(public payload: [IDish, number]) { };
}
export class AddDishSuccess implements Action {
  readonly type = ADD_DISH_SUCCESS;
  constructor(public payload: { dish: IDish, order: IOrder }) { };
}
export class AddDishFail implements Action {
  readonly type = ADD_DISH_FAIL;
  constructor(public payload: { dish: IDish, response: any }) { };
}

export class RemoveDish implements Action {
  readonly type = REMOVE_DISH;
  constructor(public payload: [IDish, number]) { };
}
export class RemoveDishSuccess implements Action {
  readonly type = REMOVE_DISH_SUCCESS;
  constructor(public payload: { dish: IDish, order: IOrder }) { };
}
export class RemoveDishFail implements Action {
  readonly type = REMOVE_DISH_FAIL;
  constructor(public payload: { dish: IDish, response: any }) { };
}

export type Actions =
  LoadOrders | LoadOrdersSuccess | LoadOrdersFail
  | GetOrder | GetOrderSuccess | GetOrderFail
  | AddOrder | AddOrderSuccess | AddOrderFail
  | CloseOrder | CloseOrderSuccess | CloseOrderFail
  | AddDish | AddDishSuccess | AddDishFail
  | RemoveDish | RemoveDishSuccess | RemoveDishFail;
