import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDish } from '../models/dish';
import { environment } from 'src/environments/environment';
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient) { }

  public list(): Observable<IDish[]>{
    return this.http.get<IDish[]>(environment.host + "api/Dish/List");
  }

  public SetState(id:number, state:number){
    return this.http.post(
      environment.host + "api/Order/SetState?id=" + id + "&dishState=" + state,
      {}
      );
  }
}
