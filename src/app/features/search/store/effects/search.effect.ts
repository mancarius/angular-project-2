import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { routerNavigatedAction } from "@ngrx/router-store";
import { Store } from "@ngrx/store";
import { mergeMap, map, catchError, of } from "rxjs";
import { coreActions } from "src/app/core/store/actions";
import { searchActions } from "../actions";
import { FruityviceApiService } from "../services/fruityvice-api/fruityvice-api.service";
import { Search } from "../state";

@Injectable()
export class SearchEffects {
  sendRequestByUrl$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routerNavigatedAction),
      mergeMap(({ type, payload }) => {
        const { url, queryParams } = payload.routerState.root;
        
        if (url[0].path === "search") {
          const filters: Search.filters = {
            ...(() => (queryParams.arg ? { [queryParams.arg]: queryParams.val } : {})),
          }
          const pagination = {
            skip: 0,
            limit: 20
          }
          return of(searchActions.sendRequest({ ...pagination, filters }))
        }

        return of(null)
      })
    )
  })

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

  saveFruits$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(searchActions.requestFulfilled),
      mergeMap(({ type, results: items }) =>
        of(coreActions.setItems({ items })))
    )
  });

  constructor(private actions$: Actions, private fruitSearch: FruityviceApiService, private store: Store) { }
}