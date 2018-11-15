import { Component, OnInit, Input } from '@angular/core';
import { IOrder } from 'src/app/models/order';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/app.state';
import * as OrderActions from '../../store/actions/orderActions';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  @Input() number: number;
  @Input() role: string;

  order: IOrder = {
    Id: 0,
    Dishes: [],
    Table: 0,
    CreatedDate: new Date(),
    Description: ''
  };
  grouppedOrder: any; // TODO: если увидел - типизируй!
  isOrdersLoading$: Observable<boolean>;
  isOrderClose$: Observable<boolean>;
  isOrderAdd$: Observable<boolean>;
  constructor(private store: Store<IAppState>) {
    this.order.Table = this.number;
  }

  ngOnInit() {
    this.store.select(c => c.orders.orders.find(o => o.Table == this.number))
      .pipe(tap(order => this.groupById(order)))
      .subscribe(order => this._mergeOrder(order));
    this.isOrdersLoading$ = this.store.select(c => c.orders.isOrdersLoading);
    this.isOrderClose$ = this.store.select(c => c.orders.isOrderClose);
    this.isOrderAdd$ = this.store.select(c => c.orders.isOrderAdd);
  }

  private _mergeOrder(order: IOrder) {
    console.log('merge order')
    if (!order) {
      return;
    }

    // Добавляем или обновляем статус
    order.Dishes.forEach(dish => {
      let currentDish = this.order.Dishes.find(c => c.CookingDishId == dish.CookingDishId);
      if (!currentDish) {
        this.order.Dishes.push(dish);
        return;
      }

      if (dish.State != currentDish.State) {
        currentDish.State = dish.State;
        return;
      }
    });

    // Удаляем ненужные
    this.order.Dishes.forEach(dish => {
      let serverDishIndex = order.Dishes.findIndex(c => c.CookingDishId == dish.CookingDishId);
      if (serverDishIndex >= 0) {
        this.order.Dishes.splice(serverDishIndex, 1);
      }
    });
  }

  add() {
    this.store.dispatch(new OrderActions.AddOrder(this.order));
  }

  close() {
    this.store.dispatch(new OrderActions.CloseOrder(this.order.Table));
  }

  public groupById(order: IOrder) {
    //review!!!
    if (!order) {
      return;
    }

    var result = [];
    for (let index = 0; index < order.Dishes.length; index++) {
      const element = order.Dishes[index];
      var io = result.map(c => c.key.Id).indexOf(element.Id);
      if (~io) {
        result[io].value.push(element);
      } else {
        result.push({ key: element, value: [element] });
      }
    }

    console.log('group result', result);
    this.grouppedOrder = result;
  }

  public getTotal() {
    return this.order.Dishes.reduce((p, c) => c.Price + p, 0);
  }
}
