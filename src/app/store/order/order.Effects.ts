import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { switchMap, map, catchError, tap, mergeMap } from "rxjs/operators";
import { OrderService } from "src/app/store/order/order.Service";
import { of } from "rxjs";
import { CookingDishService } from "src/app/store/cookingDish/cookingDish.Service";
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
import { combineLatest } from 'rxjs-compat/operator/combineLatest';
import { flatten } from '@angular/compiler';
import { loadCookingDishesSuccess } from "../cookingDish/cookingDish.Actions";

@Injectable()
export class orderEffects {
    constructor(
        private actions$: Actions,
        private orderService: OrderService,
        private cookingDishService: CookingDishService
    ) { }

    loadOrders$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadOrders),
            switchMap(action => this.orderService.list()
                // .pipe(
                //     switchMap(orders =>
                //         orders.map(order => this.cookingDishService.list(order.Id)
                //             .pipe(map(cd => loadCookingDishesSuccess({ cookingDishes: cd, orderId: order.Id })))
                //         ))
                // )
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
