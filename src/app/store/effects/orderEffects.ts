import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import * as OrderActions from "../actions/orderActions";
import { switchMap, map, catchError } from "rxjs/operators";
import { ListDishService } from "src/app/services/order.service";
import { of } from "rxjs";

@Injectable()
export class orderEffects {
  constructor(private actions$: Actions, private orderService: ListDishService) { }
  @Effect()
  loadOrders$ = this.actions$.ofType(OrderActions.LOAD_ORDERS)
    .pipe(
      switchMap(c => this.orderService.getOpenOrders()
        .pipe(
          map(orders => new OrderActions.LoadOrdersSuccess(orders)),
          catchError(error => of(new OrderActions.LoadOrdersFail(error)))
        )
      ))
}
