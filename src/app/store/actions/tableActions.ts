import { Action } from '@ngrx/store';
import { ITable } from 'src/app/models/table';

export const SET__READY_DISHES_COUNT = '[Table] Count Ready Dish';
export const SET_STATE_TABLE = '[Table] State Table';

export class CountReadyDish implements Action {
    readonly type = SET__READY_DISHES_COUNT;
    constructor(public payload: ITable[]){}
}

export class StateTable implements Action{
    readonly type = SET_STATE_TABLE;
    constructor(public payload: boolean){}
}

export type Actions = CountReadyDish| StateTable;