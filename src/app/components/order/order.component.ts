import { Component, OnInit, Input } from '@angular/core';
import { IOrder } from 'src/app/models/order';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/app.state';
import * as OrderActions from '../../store/actions/orderActions';
import * as DishActions from '../../store/actions/dishActions';
import { Observable } from 'rxjs';
import { DishState } from 'src/app/models/dishState';
import { IDish } from 'src/app/models/dish';
import { AuthService } from 'src/app/services/auth.service';
import { IDishLoading } from 'src/app/models/dishLoading';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  @Input() number: number;

  initialOrder: IOrder = {
    Id: 0,
    Dishes: [],
    Table: 0,
    CreatedDate: new Date(),
    Comment: ''
  };

  order: IOrder;

  inWorkGroupped: any; // TODO: если увидел - типизируй!
  readyDishes: IDish[];
  cancellationDishes: IDish[];
  inWorkDishes: IDish[];
  deletedDishes: IDish[];

  isOrdersLoading$: Observable<boolean>;
  isOrderClose$: Observable<boolean>;
  isOrderAdd$: Observable<boolean>;
  isOrderLoading$: Observable<boolean>;
  dishLoading: IDishLoading[];

  constructor(private store: Store<IAppState>, private auth: AuthService) {
    this.isOrdersLoading$ = this.store.select(c => c.orders.isOrdersLoading);
    this.isOrderClose$ = this.store.select(c => c.orders.isOrderClose);
    this.isOrderAdd$ = this.store.select(c => c.orders.isOrderAdd);
    this.isOrderLoading$ = this.store.select(c => c.orders.isCurrentOrderLoading);
    this.store.select(c => c.orders.currentOrder).subscribe(order => this._mergeOrder(order));
    this.store.select(c => c.orders.dishLoading).subscribe(dishLoading => this.dishLoading = dishLoading);
  }

  ngOnInit() {
    this.order = this.initialOrder;
    this.store.dispatch(new OrderActions.GetOrder(this.number));
  }

  private _mergeOrder(order: IOrder) {
    console.log('merge order', order);
    if (!order || !this.order) {
      this.order = this.initialOrder;
    } else {
      this.order.Id = order.Id;
      this.order.Comment = order.Comment;
      this.order.CreatedDate = order.CreatedDate;

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
      this.order.Dishes = this.order.Dishes
        .filter(c => order.Dishes.some(d => d.CookingDishId == c.CookingDishId) || c.CookingDishId == 0);
    }

    this.readyDishes = this.order.Dishes.filter(d => d.State == DishState.Ready);
    this.cancellationDishes = this.order.Dishes.filter(d => d.State == DishState.CancellationRequested);
    this.inWorkDishes = this.order.Dishes.filter(d => d.State == DishState.InWork);
    this.deletedDishes = this.order.Dishes.filter(d => d.State == DishState.Deleted);

    this.inWorkGroupped = this.groupById(this.order, d => d.State == DishState.InWork);
  }

  add() {
    this.store.dispatch(new OrderActions.AddOrder(this.order));
  }

  close() {
    this.store.dispatch(new OrderActions.CloseOrder(this.order.Table));
  }

  setState(dish: IDish, state: DishState) {
    this.store.dispatch(new OrderActions.ChangeState({ dish: dish, state: state }))
  }

  isStateLoading(id: number) {
    try {
      return this.dishLoading.find(c => c.dish.CookingDishId == id).isLoading;
    } catch (error) {
      return false;
    }
  }

  // TODO to pipe
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
    console.log(result, result.sort((a, b) => a.key.Id - b.key.Id))
    return result.sort(c => c.key.Id);
  }

  // TODO to pipe
  public getTotal() {
    if (!this.inWorkDishes) {
      return;
    }

    return this.inWorkDishes.reduce((p, c) => c.Price + p, 0);
  }

  public userIsInRole(roles: Array<string>) {
    return this.auth.userIsInRole(roles);
  }

  public addDish(dish: IDish) {
    this.store.dispatch(new OrderActions.AddDish(
      [{
        Id: dish.Id,
        CookingDishId: 0,
        Name: dish.Name,
        Consist: dish.Consist,
        Unit: dish.Unit,
        State: DishState.InWork,
        Price: dish.Price,
        WorkshopType: dish.WorkshopType
      },
      this.order.Id
      ]
    ));
  }
}
