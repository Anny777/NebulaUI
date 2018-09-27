import { DishViewModel } from './dishViewModel';
import { getLocaleTimeFormat } from '@angular/common';

export class OrderViewModel {
    Id: number;
    Dishes: Array<DishViewModel>;
    Table: number;
    CreatedDate : Date;
}
