import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { routerNavigatedAction } from "@ngrx/router-store";
import { mergeMap, map, catchError, of } from "rxjs";
import { coreActions } from "src/app/core/store/actions";
import { searchActions } from "../actions";
import { FruityviceApiService } from "../services/fruityvice-api/fruityvice-api.service";
import { Search } from "../state";

@Injectable()
export class SearchEffects {
  /**
   *
   *
   * @memberof SearchEffects
   */
  sendRequestOnUrlChange$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routerNavigatedAction),
      mergeMap(({ type, payload }) => {
        const { url, queryParams } = payload.routerState.root;

        if (url[0].path === "search") {
          const { arg, val, skip = 0, limit = 10 } = queryParams;
          const filters: Search.filters = {
            ...(() => (arg ? { [arg]: val } : {})),
          }

          return of(searchActions.sendRequest({ skip, limit, filters }))
        }

        return of(null)
      })
    )
  })

  /**
   *
   *
   * @memberof SearchEffects
   */
  fruitsRequest$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(searchActions.sendRequest),
      mergeMap(({ type, currentPage, ...props }) => {
        return this.fruitSearch.find(props)
          .pipe(
            map((results) => searchActions.requestFulfilled({ results })),
            catchError((error) => of(searchActions.requestRejected({ error })))
          )
      })
    )
  });

  /**
   *
   *
   * @memberof SearchEffects
   */
  saveFruits$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(searchActions.requestFulfilled),
      mergeMap(({ type, results: items }) =>
        of(coreActions.setItems({ items })))
    )
  });

  constructor(private actions$: Actions, private fruitSearch: FruityviceApiService) { }
}