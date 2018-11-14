import { IDish } from "src/app/models/dish";
import { Action } from '@ngrx/store';

export const LOAD_DISHES = '[Dish] Load';
export const LOAD_DISHES_SUCCESS = '[Dish] LoadSuccess';
export const LOAD_DISHES_FAIL = '[Dish] LoadFail';

export const ADD_DISH = '[Dish] Add';
export const ADD_DISH_SUCCESS = '[Dish] AddSuccess';
export const ADD_DISH_FAIL = '[Dish] AddFail';

export const CHANGE_STATE = '[Dish] ChangeState';
export const CHANGE_STATE_SUCCESS = '[Dish] ChangeStateSuccess';
export const CHANGE_STATE_FAIL = '[Dish] ChangeStateFail';


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

export class ChangeState implements Action{
    readonly type = CHANGE_STATE;
    constructor(public payload: any){}
}

export class ChangeStateSuccess implements Action{
    readonly type = CHANGE_STATE_SUCCESS;
}

export class ChangeStateFail implements Action{
    readonly type = CHANGE_STATE_FAIL;
    constructor(public payload: any){}
}


export type Actions = LoadDishes | LoadDishesSuccess | LoadDishesFail |  ChangeState | ChangeStateSuccess | ChangeStateFail;

