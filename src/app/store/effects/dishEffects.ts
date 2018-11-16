import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import * as DishActions from "../actions/dishActions";
import * as OrderActions from "../actions/orderActions";
import { switchMap, map, catchError, tap } from "rxjs/operators";
import { of } from "rxjs";
import { DishService } from "src/app/services/dish.service";
import { Store } from "@ngrx/store";
import { IAppState } from "../app.state";

@Injectable()
export class dishEffects {
  constructor(private actions$: Actions, private dishService: DishService, private store: Store<IAppState>) { }
  @Effect()
  loadDishes$ = this.actions$.ofType(DishActions.LOAD_DISHES)
    .pipe(
      switchMap(c => this.dishService.list()
        .pipe(
          map(dishes => new DishActions.LoadDishesSuccess(dishes)),
          catchError(error => of(new DishActions.LoadDishesFail(error)))
        )
      ));

  @Effect()
  changeState$ = this.actions$.ofType<DishActions.ChangeState>(DishActions.CHANGE_STATE)
    .pipe(
      switchMap(
        c => this.dishService.SetState(c.payload.id, c.payload.state)
          .pipe(
            map(r => new DishActions.ChangeStateSuccess()),
            catchError(error => of(new DishActions.ChangeStateFail(error)))
          )
          .pipe(
            tap(c => this.store.dispatch(new OrderActions.LoadOrders()))
          )
      ));
}
