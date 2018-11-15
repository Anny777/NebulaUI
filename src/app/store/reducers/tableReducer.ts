import { ITable } from "src/app/models/table";

  import * as TableActions from '../actions/tableActions'

export interface ITableState {
    tables: ITable[],
    isTableState: boolean,
}
const initialState: ITableState = {
    tables: [],
    isTableState: false
};

export function tableReducer(state: ITableState = initialState, action: TableActions.Actions): ITableState {
    switch (action.type) {
        case TableActions.SET__READY_DISHES_COUNT:
            return { ...state, tables: action.payload};
        case TableActions.SET_STATE_TABLE:
            return { ...state, isTableState: action.payload};
        default:
            return state;
    }
}

