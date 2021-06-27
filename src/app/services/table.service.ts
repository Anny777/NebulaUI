import { Injectable } from '@angular/core';
import { ITable } from '../models/table'

@Injectable({
  providedIn: 'root'
})
export class TableService {
  tables: ITable[] =
    [
      { number: 4, style: 'tableBase rectangle'   , busy: false, readyDishesCount: 0, orderId: '' },
      { number: 3, style: 'tableBase square'      , busy: false, readyDishesCount: 0, orderId: '' },
      { number: 2, style: 'tableBase square'      , busy: false, readyDishesCount: 0, orderId: '' },
      { number: 1, style: 'tableBase rectangle'   , busy: false, readyDishesCount: 0, orderId: '' },
      { number: 5, style: 'tableBase rectangle'   , busy: false, readyDishesCount: 0, orderId: '' },
      { number: 6, style: 'tableBase square'      , busy: false, readyDishesCount: 0, orderId: '' },
      { number: 11, style: 'tableBase rectangle'  , busy: false, readyDishesCount: 0, orderId: '' },
      { number: 12, style: 'tableBase rectangle'  , busy: false, readyDishesCount: 0, orderId: '' },
      { number: 13, style: 'tableBase rectangle'  , busy: false, readyDishesCount: 0, orderId: '' },
      { number: 14, style: 'tableBase rectangle'  , busy: false, readyDishesCount: 0, orderId: '' },
      { number: 15, style: 'tableBase rectangle'  , busy: false, readyDishesCount: 0, orderId: '' },
      { number: 16, style: 'tableBase rectangle'  , busy: false, readyDishesCount: 0, orderId: '' },
      { number: 17, style: 'tableBase rectangle'  , busy: false, readyDishesCount: 0, orderId: '' },
      { number: 18, style: 'tableBase rectangle'  , busy: false, readyDishesCount: 0, orderId: '' },
      { number: 21, style: 'tableBase square'     , busy: false, readyDishesCount: 0, orderId: '' },
      { number: 22, style: 'tableBase square'     , busy: false, readyDishesCount: 0, orderId: '' },
      { number: 23, style: 'tableBase square'     , busy: false, readyDishesCount: 0, orderId: '' }
    ];

  public getTable(number: number) {
    return this.tables.find(c => c.number == number);
  }
}
