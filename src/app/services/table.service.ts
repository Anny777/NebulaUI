import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  tables =
    [
      { Number: 4, style: 'tableBase rectangle'   , busy: false, readyDishesCount: 0 },
      { Number: 3, style: 'tableBase square'      , busy: false, readyDishesCount: 0 },
      { Number: 2, style: 'tableBase square'      , busy: false, readyDishesCount: 0 },
      { Number: 1, style: 'tableBase rectangle'   , busy: false, readyDishesCount: 0 },
      { Number: 5, style: 'tableBase rectangle'   , busy: false, readyDishesCount: 0 },
      { Number: 6, style: 'tableBase square'      , busy: false, readyDishesCount: 0 },
      { Number: 11, style: 'tableBase rectangle'  , busy: false, readyDishesCount: 0 },
      { Number: 12, style: 'tableBase rectangle'  , busy: false, readyDishesCount: 0 },
      { Number: 13, style: 'tableBase rectangle'  , busy: false, readyDishesCount: 0 },
      { Number: 14, style: 'tableBase rectangle'  , busy: false, readyDishesCount: 0 },
      { Number: 15, style: 'tableBase rectangle'  , busy: false, readyDishesCount: 0 },
      { Number: 16, style: 'tableBase rectangle'  , busy: false, readyDishesCount: 0 },
      { Number: 17, style: 'tableBase rectangle'  , busy: false, readyDishesCount: 0 },
      { Number: 18, style: 'tableBase rectangle'  , busy: false, readyDishesCount: 0 },
      { Number: 21, style: 'tableBase square'     , busy: false, readyDishesCount: 0 },
      { Number: 22, style: 'tableBase square'     , busy: false, readyDishesCount: 0 },
      { Number: 23, style: 'tableBase square'     , busy: false, readyDishesCount: 0 }
    ];

  getTable(number: number) {
    return this.tables[this.tables.map(e => { return e.Number; }).indexOf(+number)];
  }
}
