import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IAppState } from '../../store/app.state';
import { Store } from '@ngrx/store';
import { tap, map } from 'rxjs/operators';
import { IDish } from 'src/app/models/dish';
import * as DishActions from '../../store/actions/dishActions';
import * as OrderActions from '../../store/actions/orderActions';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IOrder } from 'src/app/models/order';


@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.css']
})
export class DishListComponent implements OnInit {

  message: string;
  numberTable: number;
  isView: boolean;
  numberCustom: number;

  orderArray = [];

  isListLoading$: Observable<boolean>;
  dishes$: Observable<IDish[]>;

  constructor(private store: Store<IAppState>, private route: ActivatedRoute) {
  }


  ngOnInit() {
    this.dishes$ = this.store.select(c => c.dishes.dishes);
    this.isListLoading$ = this.store.select(c => c.dishes.isListLoading);
    this.store.dispatch(new DishActions.LoadDishes());
    this.route.paramMap
      .pipe(map(p => Number.parseInt(p.get('id'))))
      .subscribe(id => {
        this.numberTable = id;
      });
  }

  addDish(dish: IDish) {
    this.store.dispatch(new OrderActions.AddDish([dish, this.numberTable]));
  }
}



