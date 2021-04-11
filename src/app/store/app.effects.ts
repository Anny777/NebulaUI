import { orderEffects } from "./effects/orderEffects";
import { dishEffects } from "./effects/dishEffects";
import { authEffects } from "./Auth/auth.Effects";

export const effects: any[] = [orderEffects, dishEffects, authEffects]
