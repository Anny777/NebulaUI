import * as DishActions from '../actions/dishActions'
import { IDish } from "src/app/models/dish";

export interface IDishState {
  dishes: IDish[],
  isListLoading: boolean,
  isChangeStateLoading: boolean
}

const initialState: IDishState = {
  dishes: [],
  isListLoading: false,
  isChangeStateLoading: false
};

export function dishReducer(state: IDishState = initialState, action: DishActions.Actions): IDishState {

  switch (action.type) {
    case DishActions.LOAD_DISHES:
      return {...state, isListLoading: true};
    case DishActions.LOAD_DISHES_SUCCESS:
      return {...state, dishes: action.payload, isListLoading: false};
    case DishActions.LOAD_DISHES_FAIL:
    return {...state, isListLoading: false};

    case DishActions.CHANGE_STATE:
      return {...state, isChangeStateLoading: true};
    case DishActions.CHANGE_STATE_SUCCESS:
      return {...state, isChangeStateLoading: false};
    case DishActions.CHANGE_STATE_FAIL:
      return {...state, isChangeStateLoading: true};
    default:
      return state;
  }

}
