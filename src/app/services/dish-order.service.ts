import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderViewModel } from '../model/orderViewModel';
import { Observable, interval } from '../../../node_modules/rxjs';
import { DishState } from '../model/enum-dishState';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ListDishService {

  @Output() OnDishInWork = new EventEmitter<boolean>();
  @Output() OnDishReady = new EventEmitter<OrderViewModel[]>();
  @Output() OnDishTaken = new EventEmitter<boolean>();

  @Output() OnDishCancelReq = new EventEmitter<boolean>();
  @Output() OnDishDelete = new EventEmitter<boolean>();
  @Output() OnArrayUpdated = new EventEmitter<OrderViewModel[]>();

  arrOrders: Array<OrderViewModel> = [];

  constructor(private http: HttpClient, private config: ConfigService) {
    // Опрос сервера каждую секунду, чтобы была актуальная информация по заказам
    const intervalObs = interval(1500);
    intervalObs.subscribe(c => {
      this.getOpenOrder().subscribe(arrayOrders => this.respon(arrayOrders));
    });
  }

  public respon(arrayOrders: any) {
    if (this.arrOrders.length == 0) {
      this.arrOrders = arrayOrders;
      return;
    }
    for (let i = 0; i < arrayOrders.length; i++) {
      const order = arrayOrders[i];
      // Узнаю есть ли уже такой заказ
      const uniqOrder = this.arrOrders.map(c => c.Id).indexOf(order.Id);
      // Такой заказ имеется в массиве, нужно проверить блюда лежащие в нем
      if (~uniqOrder) {
        console.log('Есть такие же заказы, необходимо проверить блюда в них: ');
        // Достаю имеющийся заказ
        const existingOrder = this.arrOrders[uniqOrder];
        // Нужно пройти циклом по его блюдам и сравнить CookingId
        for (let j = 0; j < existingOrder.Dishes.length; j++) {
          // Достаю блюдо из заказа
          const existElement = existingOrder.Dishes[j];
          const comeElement = order.Dishes[j];
          // Если CookingDishId не равны между собой тогда добавляем в имеющийся заказ
          if (existElement.CookingDishId != comeElement.CookingDishId) {
            console.log('Пришло новое блюдо в имеющийся заказ!');
            existingOrder.Dishes.push(order.Dishes[j]);
            this.arrOrders.push(existingOrder);
            this.OnDishInWork.emit();
          } else {
          // Если равны, то проверяем статусы, вдруг они являются готовыми
          console.log('Блюда всё те же, проверяю статус: ');
            switch (comeElement.State) {
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
        console.log('Такого заказа нет, нужно добавить: ');
        this.arrOrders.push(arrayOrders[i]);
        this.OnDishInWork.emit();
      }
    this.OnArrayUpdated.emit(this.arrOrders);
    }
  }

  public getListDishes() {
    return this.http.get(this.config.host + 'api/WebApi/GetListDishes');
  }

  public createNewOrder(param: OrderViewModel) {
    return this.http.post(this.config.host + 'api/WebApi/Order', param);
  }

  public getOpenOrder(): Observable<OrderViewModel> {
    return this.http.get<OrderViewModel>(this.config.host + 'api/WebApi/GetOrders');
  }
}

