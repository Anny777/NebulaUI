import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { switchMap, map, catchError, tap } from "rxjs/operators";
import { of } from "rxjs";
import { CookingDishService } from "src/app/store/cookingDish/cookingDish.Service";
import { loadCookingDishes, loadCookingDishesFail, loadCookingDishesSuccess } from './cookingDish.Actions';

@Injectable()
export class cookingDishEffects {
  constructor(
    private actions$: Actions,
    private cookingDishService: CookingDishService) { }

  loadCookingDishes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCookingDishes),
      switchMap(c => this.cookingDishService.list(c.orderId)
        .pipe(
          map(cookingDishes => loadCookingDishesSuccess({ cookingDishes: cookingDishes, orderId: c.orderId })),
          catchError(error => of(loadCookingDishesFail(error)))
        )
      )));
}
