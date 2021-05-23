import { Injectable, Output, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { interval, Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { IAppState } from "../app.state";
import * as OrderActions from './order.Actions';
import { IOrder } from "../../models/order";
import { environment } from "src/environments/environment";
import { AuthService } from "../Auth/auth.Service";


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
  private orderPath: string = `${environment.host}Order/`;

  // orders: Array<OrderViewModel> = [];
  // openOrders: Array<OrderViewModel> = [];
  // change: boolean;

  constructor(private http: HttpClient, private store: Store<IAppState>) { }
  public init() {
    if (this.inited || true) {
      return;
    }

    // Опрос сервера каждую секунду, чтобы была актуальная информация по заказам
    // this.inited = true;
    // this.store.dispatch(new OrderActions.LoadOrders());
    // this.intervalObs.subscribe(() => {
    //   this.store.dispatch(new OrderActions.LoadOrders());
    // });
    // this.inited = true;
  }

  public list(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(this.orderPath);
  }

  public create(table: number): Observable<string> {
    return this.http.post<string>(this.orderPath, table);
  }

  public close(id: string): Observable<any> {
    return this.http.patch(`${this.orderPath}/Close/${id}`, {});
  }

  public addComment(id: string, comment: string): Observable<IOrder> {
    return this.http.post<IOrder>(`${this.orderPath}/AddComment/${id}`, comment)
  }

  public get(id: string): Observable<IOrder> {
    return this.http.get<IOrder>(`${this.orderPath}/GetOrder?id=${id}`);
  }

  public export(table: number): Observable<any> {
    return this.http.post(`${this.orderPath}/SetExportOrder?tableNumber=${table}`, {});
  }
}
