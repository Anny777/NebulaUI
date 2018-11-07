import { IDish } from "src/app/models/dish";
import { Action } from '@ngrx/store';

export const LOAD_DISH = '[Dish] Load';
export const LOAD_DISHES_SUCCESS = '[Dish] LoadSuccess';
export const LOAD_DISHES_FAIL = '[Dish] LoadFail';

export class LoadDish implements Action {
    readonly type = LOAD_DISH;
}

export class LoadDishesSuccess implements Action {
    readonly type = LOAD_DISHES_SUCCESS;
    constructor(public payload: IDish[]) { }
}

export class LoadDishesFail implements Action {
    readonly type = LOAD_DISHES_FAIL;
    constructor(public payload: any) { }
}


export type Actions = LoadDish | LoadDishesSuccess | LoadDishesFail;
