import { DishState } from 'src/app/models/dishState';
import { ICookingDish } from './ICookingDish';

export interface ICookingDishesByOrder {
  orderId: string;
  cookingDishes: ICookingDish[];
}
