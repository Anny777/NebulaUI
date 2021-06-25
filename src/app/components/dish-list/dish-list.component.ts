import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IAppState } from '../../store/app.state';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { IDish } from 'src/app/models/dish';
import { ActivatedRoute } from '@angular/router';
import { IOrder } from 'src/app/models/order';
import { ICookingDish } from 'src/app/store/cookingDish/ICookingDish';
import { loadCookingDishes } from '../../store/cookingDish/cookingDish.Actions';


@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.css']
})
export class DishListComponent implements OnInit {

  message: string;
  numberTable: number;
  isCreateOrder: boolean = false;
  numberCustom: number;

  orderArray = [];

  isListLoading$: Observable<boolean>;
  dishes$: Observable<ICookingDish[]>;
  order: IOrder;

  initialOrder: IOrder = {
    Id: '',
    tableNumber: 0,
    CreatedDate: new Date(),
    Comment: '',
    IsExportRequested: false,
    cookingDishes: [],
  };

  constructor(private store: Store<IAppState>, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.initialOrder.tableNumber = this.numberTable;
    // this.dishes$ = this.store.select(c => c.cookingDishes.cookingDishes);
    this.isListLoading$ = this.store.select(c => c.cookingDishes.isLoading);
    this.store.select(c => c.orders.orders.find(o => o.tableNumber == this.numberTable)).subscribe(o => {
      this.order = o;
      if (!this.order) {
        this.isCreateOrder = true;
      }
      else {
        this.isCreateOrder = false;
      }
    });
    // this.store.dispatch(loadCookingDishes());
    this.route.paramMap
      .pipe(map(p => Number.parseInt(p.get('id'))))
      .subscribe(id => {
        this.numberTable = id;
        this.initialOrder.tableNumber = this.numberTable;
      });
  }

  addDish(dish: IDish) {
    // this.store.dispatch(new OrderActions.AddDish([dish, this.order.Id]));
  }

  createOrder() {
    // this.store.dispatch(new OrderActions.AddOrder(this.initialOrder));
  }
}



