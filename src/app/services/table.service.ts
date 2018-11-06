import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';
import { DishListComponent } from '../components/dish-list/dish-list.component';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  tables =
    [
      { Number: 4, style: 'tableBase rectangle'   , busy: false},
      { Number: 3, style: 'tableBase square'      , busy: false},
      { Number: 2, style: 'tableBase square'      , busy: false},
      { Number: 1, style: 'tableBase rectangle'   , busy: false},
      { Number: 5, style: 'tableBase rectangle'   , busy: false},
      { Number: 6, style: 'tableBase square'      , busy: false},
      { Number: 11, style: 'tableBase rectangle'  , busy: false},
      { Number: 12, style: 'tableBase rectangle'  , busy: false},
      { Number: 13, style: 'tableBase rectangle'  , busy: false},
      { Number: 14, style: 'tableBase rectangle'  , busy: false},
      { Number: 15, style: 'tableBase rectangle'  , busy: false},
      { Number: 16, style: 'tableBase rectangle'  , busy: false},
      { Number: 17, style: 'tableBase rectangle'  , busy: false},
      { Number: 18, style: 'tableBase rectangle'  , busy: false},
      { Number: 21, style: 'tableBase square'     , busy: false},
      { Number: 22, style: 'tableBase square'     , busy: false},
      { Number: 23, style: 'tableBase square'     , busy: false}
    ];

  getTable(number: number) {
    return this.tables[this.tables.map(e => { return e.Number; }).indexOf(+number)];
  }
}
