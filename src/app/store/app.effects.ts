import { orderEffects } from "./order/order.Effects";
import { cookingDishEffects } from "./cookingDish/cookingDish.Effects";
import { authEffects } from "./Auth/auth.Effects";

export const effects: any[] = [orderEffects, cookingDishEffects, authEffects]
