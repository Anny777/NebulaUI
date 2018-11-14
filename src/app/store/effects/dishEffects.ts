import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import * as DishActions from "../actions/dishActions";
import { switchMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs";
import { DishService } from "src/app/services/dish.service";

@Injectable()
export class dishEffects {
  constructor(private actions$: Actions, private dishService: DishService) { }
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
  chahgeState$ = this.actions$.ofType<DishActions.ChangeState>(DishActions.CHANGE_STATE)
    .pipe(
      switchMap(c => this.dishService.SetState(c.payload.id, c.payload.state)
        .pipe(
          map(r => new DishActions.ChangeStateSuccess()),
          catchError(error => of(new DishActions.ChangeStateFail(error)))
        )
      ));
}
