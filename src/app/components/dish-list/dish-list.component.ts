import { Component, OnInit } from '@angular/core';
import { DishViewModel } from '../../model/dishViewModel';
import { Observable } from 'rxjs';
import { IOrder } from '../../models/order';
import { IAppState } from '../../store/app.state';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { IDish } from 'src/app/models/dish';
import * as DishActions from '../../store/actions/dishActions';
import { ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.css']
})
export class DishListComponent implements OnInit {

  message: string;
  numberTable: number;
  isView: boolean;
  numberCustom: number;

  list: Array<DishViewModel>;
  orderArray = [];

  isListLoading$: Observable<boolean>;
  dishes$: Observable<IDish[]>;
  constructor(private store: Store<IAppState>, private route: ActivatedRoute) {
  }


  ngOnInit() {
    this.dishes$ = this.store.select(c => c.dishes.dishes);
    this.isListLoading$ = this.store.select(c => c.dishes.isListLoading);

    this.store.dispatch(new DishActions.LoadDishes());

    // this.isLoading = true;
    // this.listServices.getListDishes(r => this.resp(r));
    this.route.paramMap.pipe(
      tap((params: ParamMap) => {
        this.numberTable = Number.parseInt(params.get('id'));
      }
      )).subscribe();
  }

  public addDish(dish: Array<DishViewModel>) {
    console.log('addDish');
    this.orderArray.push(dish);
    if (this.orderArray.length > 0) {
      this.isView = true;
    }
  }

  // resp(r: any) {
  //   this.isLoading = false;
  //   this.list = r;
  // }

  // response(result: any) {
  //   console.log('response');
  //   for (let index = 0; index < result.length; index++) {
  //     const element = result[index];
  //     if (element.Table == this.numberTable) {
  //       this.numberCustom = element.Id;
  //       this.orderArray = element.Dishes;
  //       this.isView = true;
  //     }
  //   }
  // }


}



