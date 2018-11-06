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
  @Output() OnDishReady = new EventEmitter<any>();
  @Output() OnDishTaken = new EventEmitter<boolean>();

  @Output() OnDishCancelReq = new EventEmitter<boolean>();
  @Output() OnDishDelete = new EventEmitter<boolean>();
  @Output() OnArrayUpdated = new EventEmitter<OrderViewModel[]>();

  orders: Array<OrderViewModel> = [];
  openOrders: Array<OrderViewModel> = [];

  change: boolean;

  constructor(private http: HttpClient, private router: Router) {
    // Опрос сервера каждую секунду, чтобы была актуальная информация по заказам
    const intervalObs = interval(1500);
    intervalObs.subscribe(c => {
      this.getOpenOrder(arrayOrders => this.respon(arrayOrders));
    });
  }

  //Функция принимает массив заказов
  public respon(arrayOrders: any) {
    this.openOrders = arrayOrders;

    // Если массив пришел пустой, то вернуть пустой массив
    if (this.orders.length == 0) {
      this.orders = arrayOrders;
      return;
    }

    this.change = false;
    // Если массив имеет элементы, запускается цикл
    for (let i = 0; i < arrayOrders.length; i++) {
      // Флаг указывает что не было никаких изменений
      const order = arrayOrders[i];
      // indexOf ищет одинаковые заказы
      const orderIndex = this.orders.map(c => c.Id).indexOf(order.Id);
      // Если есть заказ, нужно обработать его блюда на изменения
      if (orderIndex > -1) {
        const currentOrder = this.orders[orderIndex];
        // Запускается цикл для обработки новых блюд
        for (let dishIndex = 0; dishIndex < order.Dishes.length; dishIndex++) {
          const newDish = order.Dishes[dishIndex];
          // indexOf ищет блюда с одинаковыми cookingId
          const currentDishIndex = currentOrder.Dishes.map(
            c => c.CookingDishId
          ).indexOf(newDish.CookingDishId);
          // Если не нашел, значит блюдо новое и его нужно добавить в массив и отправить emit, 
          // сообщая, что блюдо должно быть в работе
          if (currentDishIndex < 0) {
            this.change = true;
            currentOrder.Dishes.push(newDish);
            this.OnDishInWork.emit();
          }
          // Если не нашел, то проверяем, может сменился статус
          else {
            const currentDish = currentOrder.Dishes[currentDishIndex];
            if (currentDish.State == newDish.State) {
              continue;
            }
            currentDish.State = newDish.State;
            switch (newDish.State) {
              case DishState.Ready:
                this.change = true;
                this.OnDishReady.emit({Name: newDish.Name, Table: order.Table});
                break;
              case DishState.Taken:
                this.change = true;
                this.OnDishTaken.emit();
                break;
              case DishState.CancellationRequested:
                this.change = true;
                this.OnDishCancelReq.emit(order);
                break;
              case DishState.Deleted:
                this.change = true;
                this.OnDishDelete.emit(order);
                break;
              default:
                break;
            }
          }
        }
      }
      // Если нет заказа, значит он новый, нужно добавить в массив и отправить emit, что блюда должны быть в работе
      else {
        this.change = true;
        this.orders.push(arrayOrders[i]);
        this.OnDishInWork.emit();
      }
    }

    if (this.change == true) {
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
        d => cb(true));
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