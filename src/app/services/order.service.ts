import { Injectable, Output, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { interval, Observable } from "rxjs";
import { Router } from "@angular/router";
import { DishService } from "./dish.service";
import { Store } from "@ngrx/store";
import { IAppState } from "../store/app.state";
import * as OrderActions from '../store/actions/orderActions';
import { IOrder } from "../models/order";
import { environment } from "src/environments/environment";
import { IDish } from "../models/dish";
import { map } from "rxjs/operators";


@Injectable({
  providedIn: "root"
})
export class OrderService {
  @Output() OnDishInWork = new EventEmitter<boolean>();
  @Output() OnDishReady = new EventEmitter<any>();
  @Output() OnDishTaken = new EventEmitter<boolean>();

  @Output() OnDishCancelReq = new EventEmitter<boolean>();
  @Output() OnDishDelete = new EventEmitter<boolean>();

  private inited: boolean = false;
  private intervalObs = interval(2000);

  // orders: Array<OrderViewModel> = [];
  // openOrders: Array<OrderViewModel> = [];
  // change: boolean;

  constructor(private http: HttpClient, private router: Router, private listDishes: DishService, private store: Store<IAppState>) { }
  public init() {
    if (this.inited) {
      return;
    }

    // Опрос сервера каждую секунду, чтобы была актуальная информация по заказам
    this.intervalObs.subscribe(c => {
      this.inited = true;
      // this.store.dispatch(new OrderActions.LoadOrders());
    });
    this.inited = true;
  }

  public getList(): Observable<IOrder[]> {
    console.log('get orders list!');
    return this.http.get<IOrder[]>(environment.host + "Order");
  }

  public get(table: number): Observable<IOrder> {
    console.log('get order!');
    return this.http.get<IOrder>(environment.host + "Order/" + table);
  }

  public create(order: IOrder): Observable<any> {
    return this.http.post(environment.host + "Order", order);
  }

  public close(table: number): Observable<any> {
    return this.http.post(environment.host + "Order?tableNumber=" + table, {});
  }
}
