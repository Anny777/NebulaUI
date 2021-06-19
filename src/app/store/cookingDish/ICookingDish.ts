import { DishState } from 'src/app/models/dishState';

export interface ICookingDish {
  id: string;
  dishName: string;
  dishState: DishState;
}
