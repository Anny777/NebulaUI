import { orderEffects } from "./order/order.Effects";
import { dishEffects } from "./dish/dishEffects";
import { authEffects } from "./Auth/auth.Effects";

export const effects: any[] = [orderEffects, dishEffects, authEffects]
