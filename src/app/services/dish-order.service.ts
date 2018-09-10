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
      // Узнаю есть ли уже такой заказ
      const orderIndex = this.orders.map(c => c.Id).indexOf(order.Id);
      // Такой заказ имеется в массиве, нужно проверить блюда лежащие в нем
      if (orderIndex > -1) {
        console.log("Есть такие же заказы, необходимо проверить блюда в них: ");
        // Достаю имеющийся заказ
        const currentOrder = this.orders[orderIndex];
        // Нужно пройти циклом по его блюдам и сравнить CookingId
        for (let dishIndex = 0; dishIndex < order.Dishes.length; dishIndex++) {
          const newDish = order.Dishes[dishIndex];
          const currentDishIndex = currentOrder.Dishes.map(
            c => c.CookingDishId
          ).indexOf(newDish.CookingDishId);
          if (currentDishIndex < 0) {
            console.log("Пришло новое блюдо в имеющийся заказ!");
            currentOrder.Dishes.push(newDish);
            this.OnDishInWork.emit();
          } else {
            // Если равны, то проверяем статусы, вдруг они являются готовыми
            const currentDish = currentOrder.Dishes[currentDishIndex];
            console.log("Блюда всё те же, проверяю статус: ");
            if (currentDish.State == newDish.State) {
              continue;
            }

            console.log("Изменился статус блюда: " + currentDish.Name);
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
        console.log("Такого заказа нет, нужно добавить: ");
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
    console.log("Готово!" + id);
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
