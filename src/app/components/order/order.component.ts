import { Component, OnInit, Input } from '@angular/core';
import { IOrder } from 'src/app/models/order';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/app.state';
import * as OrderActions from '../../store/actions/orderActions';
import * as DishActions from '../../store/actions/dishActions';
import { Observable } from 'rxjs';
import { DishState } from 'src/app/models/dishState';
import { IDish } from 'src/app/models/dish';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  @Input() number: number;
  @Input() roles: string[];

  order: IOrder = {
    Id: 0,
    Dishes: [],
    Table: 0,
    CreatedDate: new Date(),
    Comment: ''
  };

  isStateLoadings: number[];
  inWorkGroupped: any; // TODO: если увидел - типизируй!
  readyDishes: IDish[];
  cancellationDishes: IDish[];
  inWorkDishes: IDish[];
  deletedDishes: IDish[];

  isOrdersLoading$: Observable<boolean>;
  isOrderClose$: Observable<boolean>;
  isOrderAdd$: Observable<boolean>;
  constructor(private store: Store<IAppState>) {
  }

  ngOnInit() {
    this.order.Table = this.number;
    this.store.select(c => c.orders.orders.find(o => o.Table == this.number))
      .subscribe(order => this._mergeOrder(order));
    this.isOrdersLoading$ = this.store.select(c => c.orders.isOrdersLoading);
    this.isOrderClose$ = this.store.select(c => c.orders.isOrderClose);
    this.isOrderAdd$ = this.store.select(c => c.orders.isOrderAdd);
  }

  private _mergeOrder(order: IOrder) {
    if (!order) {
      return;
    }

    this.order.Id = order.Id;
    this.order.Comment = order.Comment;
    this.order.CreatedDate = order.CreatedDate;

    // Добавляем или обновляем статус
    order.Dishes.forEach(dish => {
      let currentDish = this.order.Dishes.find(c => c.CookingDishId == dish.CookingDishId);
      if (!currentDish) {
        this.order.Dishes.push(dish);
        console.log('dish pushed', dish);
        return;
      }

      if (dish.State != currentDish.State) {
        currentDish.State = dish.State;
        return;
      }
    });

    // Удаляем ненужные
    this.order.Dishes = this.order.Dishes
      .filter(c => order.Dishes.some(d => d.CookingDishId == c.CookingDishId) || c.CookingDishId == 0);

    this.readyDishes = this.order.Dishes.filter(d => d.State == DishState.Ready);
    this.cancellationDishes = this.order.Dishes.filter(d => d.State == DishState.CancellationRequested);
    this.inWorkDishes = this.order.Dishes.filter(d => d.State == DishState.InWork);
    this.deletedDishes = this.order.Dishes.filter(d => d.State == DishState.Deleted);

    this.inWorkGroupped = this.groupById(order, d => d.State == DishState.InWork);
    this.isStateLoadings = [];

    console.log(this.order);
  }

  add() {
    this.store.dispatch(new OrderActions.AddOrder(this.order));
  }

  close() {
    this.store.dispatch(new OrderActions.CloseOrder(this.order.Table));
  }

  reset() {

  }

  setState(id: number, state: DishState) {
    this.isStateLoadings.push(id);
    this.store.dispatch(new DishActions.ChangeState({ id: id, state: state }))
  }

  isStateLoading(id: number) {
    return this.isStateLoadings.some(c => c == id);
  }

  public groupById(order: IOrder, predicate: (c: IDish) => boolean): any {
    //review!!!
    if (!order) {
      return;
    }

    var result = [];
    for (let index = 0; index < order.Dishes.length; index++) {
      const element = order.Dishes[index];

      // Фильтруем по предикату
      if (predicate && !predicate(element)) {
        continue;
      }

      var io = result.map(c => c.key.Id).indexOf(element.Id);
      if (~io) {
        result[io].value.push(element);
      } else {
        result.push({ key: element, value: [element] });
      }
    }

    return result;
  }

  public getTotal() {
    return this.order.Dishes.filter(c => c.State == DishState.InWork).reduce((p, c) => c.Price + p, 0);
  }

  public stateToString(state: DishState): string {
    switch (state) {
      case DishState.Deleted:
        return 'Удалено';
      case DishState.InWork:
        return 'В работе';
      case DishState.Ready:
        return 'Готово';
      case DishState.Taken:
        return 'Забрано';
      case DishState.CancellationRequested:
        return 'Запрошена отмена';

      default:
        return 'Не известный статус!';

    }
  }
}
