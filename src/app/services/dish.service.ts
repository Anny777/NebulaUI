import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDish } from '../models/dish';
import { environment } from 'src/environments/environment';
import { HttpClient } from "@angular/common/http";
import { IOrder } from '../models/order';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient) { }

  public list(): Observable<IDish[]> {
    return this.http.get<IDish[]>(environment.host + "api/Dish/List");
  }

  public SetState(id: number, state: number): Observable<IOrder> {
    return this.http.post<IOrder>(
      environment.host + "api/Dish/SetState?id=" + id + "&dishState=" + state,
      {}
    );
  }

  public addDish(dish: IDish, orderId: number): Observable<{ dish: IDish, order: IOrder }> {
    return this.http
      .post<IOrder>(environment.host + "api/Order/AddDish?orderId=" + orderId, dish)
      .pipe(map(order => { return { dish, order } }));
  }
}
