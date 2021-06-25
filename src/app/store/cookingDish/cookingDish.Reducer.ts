import { Action, createReducer, on } from '@ngrx/store';
import { loadCookingDishes, loadCookingDishesFail, loadCookingDishesSuccess } from './cookingDish.Actions';
import { ICookingDishesByOrder } from './ICookingDishesByOrder';

export interface ICookingDishState {
  cookingDishesByOrder: ICookingDishesByOrder[],
  isLoading: boolean
}

const initialState: ICookingDishState = {
  cookingDishesByOrder: [],
  isLoading: false
};

const _reducer = createReducer(
  initialState,
  on(loadCookingDishes, (state) => ({ ...state, isLoading: true })),
  on(loadCookingDishesSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    cookingDishesByOrder: [
      ...state.cookingDishesByOrder.filter(cdbo => cdbo.orderId == action.orderId),
      { orderId: action.orderId, cookingDishes: action.cookingDishes }
    ]
  })),
  on(loadCookingDishesFail, (state, action) => ({ ...state, isLoading: false }))
);

export function cookingDishReducer(state: ICookingDishState, action: Action): ICookingDishState {
  return _reducer(state, action);
}
