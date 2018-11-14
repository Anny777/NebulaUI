import * as DishActions from '../actions/dishActions'
import { IDish } from "src/app/models/dish";

export interface IDIshState {
  dishes: IDish[],
  isLoading: boolean
}

const initialState: IDIshState = {
  dishes: [],
  isLoading: true
};

export function dishReducer(state: IDIshState = initialState, action: DishActions.Actions): IDIshState {

  switch (action.type) {
    case DishActions.LOAD_DISHES:
      return {
        ...state,
        isLoading: true
      }
    case DishActions.LOAD_DISHES_SUCCESS:
      return {
        ...state,
        dishes: action.payload,
        isLoading: false
      }
    case DishActions.LOAD_DISHES_FAIL:
      return {
        ...state,
        isLoading: false
      }
    case DishActions.CHANGE_STATE:
      return {
        ...state,
        isLoading: true
      }
    case DishActions.CHANGE_STATE_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case DishActions.CHANGE_STATE_FAIL:
      return {
        ...state,
        isLoading: false
      }
    default:
      return state;
  }

}
