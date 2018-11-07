import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import * as DishActions from "../actions/dishActions";
import { switchMap, map, catchError } from "rxjs/operators";
import { ListDishService } from "src/app/services/dish-order.service";
import { of } from "rxjs";
import { DishService } from "src/app/services/dish.service";

@Injectable()
export class dishEffects {
  constructor(private actions$: Actions, private dishService: DishService) { }
  @Effect()
  loadDishes$ = this.actions$.ofType(DishActions.LOAD_DISH)
    .pipe(
      switchMap(c => this.dishService.getListDishes()
        .pipe(
          map(dishes => new DishActions.LoadDishesSuccess(dishes)),
          catchError(error => of(new DishActions.LoadDishesFail(error)))
        )
      ))
}
