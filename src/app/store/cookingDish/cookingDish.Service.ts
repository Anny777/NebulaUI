import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDish } from '../../models/dish';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { IOrder } from '../../models/order';
import { ICookingDish } from './ICookingDish';

@Injectable({
  providedIn: 'root'
})
export class CookingDishService {
  dishPath: string = `${environment.host}CookingDishes`;

  constructor(private http: HttpClient) { }

  public list(orderId: string): Observable<ICookingDish[]> {
    return this.http.get<ICookingDish[]>(`${this.dishPath}?orderId=${orderId}`);
  }

  public addDish(orderId: string, dishId: string): Observable<HttpResponse<any>> {
    return this.http
      .post<HttpResponse<any>>(`${this.dishPath}/AddDish?id=${orderId}&dishId=${dishId}`, {});
  }

  public requestCancellation(id: string): Observable<HttpResponse<any>> {
    return this.http
      .post<HttpResponse<any>>(`${this.dishPath}/RequestCancellation?id=${id}`, {});
  }

  public setReady(id: string): Observable<HttpResponse<any>> {
    return this.http
      .post<HttpResponse<any>>(`${this.dishPath}/SetReady?id=${id}`, {});
  }

  public setTaken(id: string): Observable<HttpResponse<any>> {
    return this.http
      .post<HttpResponse<any>>(`${this.dishPath}/SetTaken?id=${id}`, {});
  }

  public setDeleted(id: string): Observable<HttpResponse<any>> {
    return this.http
      .post<HttpResponse<any>>(`${this.dishPath}/SetDeleted?id=${id}`, {});
  }
}
