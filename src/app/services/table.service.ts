import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';
import { DishListComponent } from '../dish-list/dish-list.component';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  tables =
    [
      { Number: 4, style: 'tableBase rectangle' },
      { Number: 3, style: 'tableBase square' },
      { Number: 2, style: 'tableBase square' },
      { Number: 1, style: 'tableBase rectangle' },
      { Number: 5, style: 'tableBase rectangle' },
      { Number: 6, style: 'tableBase square' },
      { Number: 11, style: 'tableBase rectangle' },
      { Number: 12, style: 'tableBase rectangle' },
      { Number: 13, style: 'tableBase rectangle' },
      { Number: 14, style: 'tableBase rectangle' },
      { Number: 15, style: 'tableBase rectangle' },
      { Number: 16, style: 'tableBase rectangle' },
      { Number: 17, style: 'tableBase rectangle' },
      { Number: 18, style: 'tableBase rectangle' },
      { Number: 21, style: 'tableBase square' },
      { Number: 22, style: 'tableBase square' },
      { Number: 23, style: 'tableBase square' }
    ];

  getTable(number: number) {
    return this.tables[this.tables.map(e => { return e.Number; }).indexOf(+number)];
  }
}
