import { IDish } from "src/app/models/dish";
import { Action } from '@ngrx/store';
import { IOrder } from "src/app/models/order";
import { DishState } from "src/app/models/dishState";

export const LOAD_DISHES = '[Dish] Load';
export const LOAD_DISHES_SUCCESS = '[Dish] Load Success';
export const LOAD_DISHES_FAIL = '[Dish] Load Fail';

export const ADD_DISH = '[Dish] Add';
export const ADD_DISH_SUCCESS = '[Dish] Add Success';
export const ADD_DISH_FAIL = '[Dish] Add Fail';

export const CHANGE_STATE = '[Dish] Change State';
export const CHANGE_STATE_SUCCESS = '[Dish] Change State Success';
export const CHANGE_STATE_FAIL = '[Dish] Change State Fail';


export class LoadDishes implements Action {
  readonly type = LOAD_DISHES;
}

export class LoadDishesSuccess implements Action {
  readonly type = LOAD_DISHES_SUCCESS;
  constructor(public payload: IDish[]) { }
}

export class LoadDishesFail implements Action {
  readonly type = LOAD_DISHES_FAIL;
  constructor(public payload: any) { }
}

export class ChangeState implements Action {
  readonly type = CHANGE_STATE;
  constructor(public payload: { dish: IDish, state: DishState }) { }
}

export class ChangeStateSuccess implements Action {
  readonly type = CHANGE_STATE_SUCCESS;
  constructor(public payload: IOrder) { }
}

export class ChangeStateFail implements Action {
  readonly type = CHANGE_STATE_FAIL;
  constructor(public payload: any) { }
}


export type Actions = LoadDishes | LoadDishesSuccess | LoadDishesFail | ChangeState | ChangeStateSuccess | ChangeStateFail;

