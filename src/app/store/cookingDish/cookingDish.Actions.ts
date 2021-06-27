import { createAction, props } from '@ngrx/store';
import { ICookingDish } from './ICookingDish';

export const loadCookingDishes = createAction('[CookingDish] Load', props<{ orderId: string }>());
export const loadCookingDishesSuccess = createAction('[CookingDish] Load success', props<{ cookingDishes: ICookingDish[], orderId: string }>());
export const loadCookingDishesFail = createAction('[CookingDish] Load success', props<any>());
