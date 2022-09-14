import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { FruityviceApiService } from "src/app/shared/services/fruityvice-api/fruityvice-api.service";
import * as FruitPageActions from "../actions";

@Injectable()
export default class FruitPageEffects {
  /**
   * Get fruit by id through fruityvice service
   * and return requestFulfilled or requestRejected actions
   *
   * @memberof FruitPageEffects
   */
  getFruit$ = createEffect(() =>
    this._actions$.pipe(
      ofType(FruitPageActions.sendRequest),
      mergeMap(({ id }) =>
        // call api service
        this._fruityvice.getById(id).pipe(
          // return requestFulfilled action with obtained fruit
          map((fruit) => FruitPageActions.requestFulfilled({ fruit })),

          // return requestRejected action with request error
          catchError((error) => of(FruitPageActions.requestRejected({ error })))
        )
      )
    )
  );

  constructor(
    private _actions$: Actions,
    private _fruityvice: FruityviceApiService
  ) {}
}
