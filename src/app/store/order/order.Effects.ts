import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { switchMap, map, catchError, tap } from "rxjs/operators";
import { OrderService } from "src/app/store/order/order.Service";
import { of } from "rxjs";
import { DishService } from "src/app/store/dish/dish.service";
import { Store } from "@ngrx/store";
import { IAppState } from "../app.state";
import {
  closeOrder,
  closeOrderFail,
  closeOrderSuccess,
  commentOrder,
  commentOrderFail,
  commentOrderSuccess,
  createOrder,
  createOrderFail,
  createOrderSuccess,
  getOrder,
  getOrderFail,
  getOrderSuccess,
  loadOrders,
  loadOrdersFail,
  loadOrdersSuccess
} from './order.Actions';

@Injectable()
export class orderEffects {
  constructor(
    private actions$: Actions,
    private dishService: DishService,
    private orderService: OrderService,
    private store: Store<IAppState>
  ) { }

  loadOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadOrders),
      switchMap(c => this.orderService.list()
        .pipe(
          map(orders => loadOrdersSuccess({ orders: orders })),
          catchError(error => of(loadOrdersFail(error)))
        )
      )));

  createOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createOrder),
      switchMap((c) => this.orderService.create(c.table)
        .pipe(
          map(id => createOrderSuccess({ id })),
          catchError(error => of(createOrderFail(error)))
        )
      )));

  getOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getOrder),
      switchMap((c) => this.orderService.get(c.id)
        .pipe(
          map(order => getOrderSuccess({ order: order })),
          catchError(error => of(getOrderFail(error)))
        )
      )));

  closeOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(closeOrder),
      switchMap((c) => this.orderService.close(c.id)
        .pipe(
          map(response => closeOrderSuccess({ response: response })),
          catchError(error => of(closeOrderFail(error)))
        )
      )));

  commentOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(commentOrder),
      switchMap((c) => this.orderService.addComment(c.id, c.comment)
        .pipe(
          map(response => commentOrderSuccess({ response: response })),
          catchError(error => of(commentOrderFail(error)))
        )
      )));
}
