import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDish } from '../../models/dish';
import { environment } from 'src/environments/environment';
import { HttpClient } from "@angular/common/http";
import { IOrder } from '../../models/order';

@Injectable({
  providedIn: 'root'
})
export class DishService {
dishPath : string = `${environment.host}Dish`;
  constructor(private http: HttpClient) { }

  public list(): Observable<IDish[]> {
    return this.http.get<IDish[]>(`${this.dishPath}/List`);
  }

  public SetState(dish: IDish, state: number): Observable<IOrder> {
    return this.http
      .post<IOrder>(`${this.dishPath}/SetState?id=` + dish.CookingDishId + "&dishState=" + state, {});
  }

  public addDish(dish: IDish, orderId: number): Observable<IOrder> {
    return this.http
      .post<IOrder>(environment.host + "Dish/AddDish?idOrder=" + orderId, dish);
  }
}
