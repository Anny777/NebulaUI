import { Injectable, Output, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { OrderViewModel } from "../model/orderViewModel";
import { Observable, interval } from "../../../node_modules/rxjs";
import { DishState } from "../model/enum-dishState";
import { ConfigService } from "./config.service";

@Injectable({
  providedIn: "root"
})
export class ListDishService {
  @Output()
  OnDishInWork = new EventEmitter<boolean>();
  @Output()
  OnDishReady = new EventEmitter<OrderViewModel[]>();
  @Output()
  OnDishTaken = new EventEmitter<boolean>();

  @Output()
  OnDishCancelReq = new EventEmitter<boolean>();
  @Output()
  OnDishDelete = new EventEmitter<boolean>();
  @Output()
  OnArrayUpdated = new EventEmitter<OrderViewModel[]>();

  orders: Array<OrderViewModel> = [];

  constructor(private http: HttpClient, private config: ConfigService) {
    // Опрос сервера каждую секунду, чтобы была актуальная информация по заказам
    const intervalObs = interval(1500);
    intervalObs.subscribe(c => {
      this.getOpenOrder().subscribe(arrayOrders => this.respon(arrayOrders));
    });
  }

  public respon(arrayOrders: any) {
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

  public getListDishes() {
    return this.http.get(this.config.host + "api/dish/List");
  }

  public createNewOrder(param: OrderViewModel) {
    return this.http.post(this.config.host + "api/Order/New", param);
  }

  public getOpenOrder(): Observable<OrderViewModel> {
    return this.http.get<OrderViewModel>(this.config.host + "api/Order/List");
  }

  public setReady(id: number): Observable<any> {
    return this.http.post(
      this.config.host + "api/Order/SetState?id=" + id + "&dishState=3",
      {}
    );
  }

  public setDeleted(id: number): Observable<any> {
    return this.http.post(
      this.config.host + "api/Order/SetState?id=" + id + "&dishState=1",
      {}
    );
  }
}
