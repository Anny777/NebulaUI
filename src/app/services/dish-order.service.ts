import { Injectable, Output, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { OrderViewModel } from "../model/orderViewModel";
import { Observable, interval } from "../../../node_modules/rxjs";
import { DishState } from "../model/enum-dishState";
import { DishViewModel } from "../model/dishViewModel";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class ListDishService {
  @Output() OnDishInWork = new EventEmitter<boolean>();
  @Output() OnDishReady = new EventEmitter<OrderViewModel[]>();
  @Output() OnDishTaken = new EventEmitter<boolean>();

  @Output() OnDishCancelReq = new EventEmitter<boolean>();
  @Output() OnDishDelete = new EventEmitter<boolean>();
  @Output() OnArrayUpdated = new EventEmitter<OrderViewModel[]>();

  orders: Array<OrderViewModel> = [];
  openOrders: Array<OrderViewModel> = [];


  constructor(private http: HttpClient, private router: Router) {
    // Опрос сервера каждую секунду, чтобы была актуальная информация по заказам
    const intervalObs = interval(1500);
    intervalObs.subscribe(c => {
      this.getOpenOrder(arrayOrders => this.respon(arrayOrders));
    });
  }

  public respon(arrayOrders: any) {
    this.openOrders = arrayOrders;

    if (this.orders.length == 0) {
      this.orders = arrayOrders;
      return;
    }
    for (let i = 0; i < arrayOrders.length; i++) {
      const order = arrayOrders[i];
      const orderIndex = this.orders.map(c => c.Id).indexOf(order.Id);
      if (orderIndex > -1) {
        const currentOrder = this.orders[orderIndex];
        for (let dishIndex = 0; dishIndex < order.Dishes.length; dishIndex++) {
          const newDish = order.Dishes[dishIndex];
          const currentDishIndex = currentOrder.Dishes.map(
            c => c.CookingDishId
          ).indexOf(newDish.CookingDishId);
          if (currentDishIndex < 0) {
            currentOrder.Dishes.push(newDish);
            this.OnDishInWork.emit();
          } else {
            const currentDish = currentOrder.Dishes[currentDishIndex];
            if (currentDish.State == newDish.State) {
              continue;
            }
            currentDish.State = newDish.State;
            switch (newDish.State) {
              case DishState.Ready:
                this.OnDishReady.emit(order);
                break;
              case DishState.Taken:
                this.OnDishTaken.emit();
                break;
              case DishState.CancellationRequested:
                this.OnDishCancelReq.emit(order);
                break;
              case DishState.Deleted:
                this.OnDishDelete.emit(order);
                break;
              default:
                break;
            }
          }
        }
      } else {
        this.orders.push(arrayOrders[i]);
        this.OnDishInWork.emit();
      }

      this.OnArrayUpdated.emit(this.orders);
    }
  }

  public getTotalDish(_array: DishViewModel[]) {
    var total = 0;
    for (var i = 0; i < _array.length; i++) {
      total += _array[i].Price;
    }
    return total;
  }

  public getListDishes(cb: any) {
    this.http.get(environment.host + "api/dish/List").subscribe(
      d => cb(d),
      d => console.log(d))
  }

  public createNewOrder(param: OrderViewModel, cb: any) {
    this.http.post(environment.host + "api/Order/New", param).subscribe(
      d => this.router.navigate(['/']),
      d => console.log(d));
  }

  public getOpenOrder(cb: any) {
    this.http.get(environment.host + "api/Order/List").subscribe(
      d => cb(d),
      d => console.log(d));
  }

  public setReady(id: number, cb: any) {
    this.http.post(
      environment.host + "api/Order/SetState?id=" + id + "&dishState=3", {}).subscribe(
        d => cb(true),
        d => console.log(d));
  }

  public setDeleted(id: number): Observable<any> {
    return this.http.post(
      environment.host + "api/Order/SetState?id=" + id + "&dishState=1",
      {}
    );
  }

  public closeOrder(table: number, cb: any) {
    this.http.post(
      environment.host + "api/Order/Close?tableNumber=" + table,
      {}).subscribe(
      d => cb(true),
      d => console.log(d));
  }
}
