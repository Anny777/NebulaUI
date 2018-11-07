import { WorkshopType } from "./workShopType";
import { DishState } from "./dishState";

export interface IDish {
  Id: number;
  CookingDishId: number;
  Name: string;
  Consist: string;
  Unit: string;
  State: DishState;
  Comment: string;
  Price: number;
  WorkshopType: WorkshopType;
}
