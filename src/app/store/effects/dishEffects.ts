import { Injectable } from "@angular/core";
import { Effect, Actions, ofType, createEffect } from "@ngrx/effects";
import * as DishActions from "../actions/dishActions";
import { switchMap, map, catchError, tap } from "rxjs/operators";
import { of } from "rxjs";
import { DishService } from "src/app/services/dish.service";

@Injectable()
export class dishEffects {
  constructor(private actions$: Actions, private dishService: DishService) { }
  loadDishes$ = createEffect(() => {
    return this.actions$.pipe(ofType(DishActions.LOAD_DISHES),
      switchMap(c => this.dishService.list()
        .pipe(
          map(dishes => new DishActions.LoadDishesSuccess(dishes)),
          catchError(error => of(new DishActions.LoadDishesFail(error)))
        )
      ));
  });
}
