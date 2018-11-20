import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import * as OrderActions from "../actions/orderActions";
import { switchMap, map, catchError } from "rxjs/operators";
import { OrderService } from "src/app/services/order.service";
import { of } from "rxjs";

@Injectable()
export class orderEffects {
  constructor(private actions$: Actions, private orderService: OrderService) { }
  @Effect()
  loadOrders$ = this.actions$.ofType(OrderActions.LOAD_ORDERS)
    .pipe(
      switchMap(c => this.orderService.getOpenOrders()
        .pipe(
          map(orders => new OrderActions.LoadOrdersSuccess(orders)),
          catchError(error => of(new OrderActions.LoadOrdersFail(error)))
        )
      ));

  @Effect()
  addOrder$ = this.actions$.ofType<OrderActions.AddOrder>(OrderActions.ADD_ORDER)
    .pipe(
      switchMap(c => this.orderService.create(c.payload)
        .pipe(
          map(r => new OrderActions.AddOrderSuccess()),
          catchError(error => of(new OrderActions.AddOrderFail(error)))
        )
      ));

  @Effect()
  closeOrder$ = this.actions$.ofType<OrderActions.CloseOrder>(OrderActions.CLOSE_ORDER)
    .pipe(
      switchMap(c => this.orderService.close(c.payload)
        .pipe(
          map(r => new OrderActions.CloseOrderSuccess()),
          catchError(error => of(new OrderActions.CloseOrderFail(error)))
        )
      ));
}
