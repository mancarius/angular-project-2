import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, map, catchError, of, tap } from "rxjs";
import { searchActions } from "../actions";
import { FruityviceApiService } from "../services/fruityvice-api/fruityvice-api.service";

@Injectable()
export class SearchEffects {
  /**
   *
   *
   * @memberof SearchEffects
   */
  fruitsRequest$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(searchActions.sendRequest),
      mergeMap(({ type, ...props }) => {
        const { filters, page, limit } = props;
        const skip = (page - 1) * limit;
        // call service
        return this.fruitSearch
          .find({ filters, skip, limit })
          .pipe(
            map((results) => searchActions.requestFulfilled({ results })),
            catchError((error) => of(searchActions.requestRejected({ error })))
          );
      })
    );
  });

  /**
   *
   *
   * @memberof SearchEffects
   */
  showFruitInfoOnFruitSelect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(searchActions.selectFruit),
      mergeMap(({ type, fruit }) => {
        if (!!fruit) {
          return of(searchActions.ui.showFruitInfo());
        }
      })
    )
  });


  constructor(
    private actions$: Actions,
    private fruitSearch: FruityviceApiService,
  ) {}
}
