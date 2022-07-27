import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { routerNavigatedAction } from "@ngrx/router-store";
import { Store } from "@ngrx/store";
import { mergeMap, map, catchError, of } from "rxjs";
import { coreActions } from "src/app/core/store/actions";
import { selectQueryParams } from "src/app/core/store/selectors/router.selectors";
import { searchActions } from "../actions";
import { FruityviceApiService } from "../services/fruityvice-api/fruityvice-api.service";
import { Search } from "../state";

@Injectable()
export class SearchEffects {
  fruits$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(searchActions.sendRequest),
      concatLatestFrom(action => this.store.select(selectQueryParams)),
      mergeMap(([action, queryParams]) => {
        const filters: Search.filters = {
          ...(() => (queryParams.arg ? { [queryParams.arg]: queryParams.val } : {})),
        }
        const pagination = {
          skip: 0,
          limit: 20
        }
        return this.fruitSearch.find({ ...pagination, filters })
          .pipe(
            map((results) => searchActions.requestFulfilled({ results })),
            catchError((error) => of(searchActions.requestRejected({ error })))
          )
      }
      )
    )
  });

  saveFruits$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(searchActions.requestFulfilled),
      mergeMap(({ type, results: items }) =>
        of(coreActions.setItems({ items })))
    )
  });

  constructor(private actions$: Actions, private fruitSearch: FruityviceApiService, private store: Store) { }
}