import { FruitNutritionTypes } from "@enum/fruit-nutrition-types.enum";
import { ValueOf } from "@type/value-of";
import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { routerNavigatedAction } from "@ngrx/router-store";
import { Store } from "@ngrx/store";
import { mergeMap, map, catchError, of, tap, exhaustMap, distinctUntilChanged } from "rxjs";
import { searchActions } from "../actions";
import {
  selectCurrentPage,
  selectFilters,
  selectLimit,
} from "../reducers/search.reducers";
import { FruityviceApiService } from "../services/fruityvice-api/fruityvice-api.service";
import { Search } from "../state";

@Injectable()
export class SearchEffects {
  /**
   * Update filters on route change
   *
   * @memberof SearchEffects
   */
  updateFiltersOnUrlChange$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routerNavigatedAction),
      distinctUntilChanged(),
      mergeMap(({ type, payload }) => {
        const { url, queryParams } = payload.routerState.root;

        if (url[0].path === "search") {
          const { page = 1, ...params } = queryParams as Search.queryParams;
          return of(
            searchActions.setFilters(this.queryParamsToFilters(params))
          );
        }

        return of(null);
      })
    );
  });

  /**
   * Update pagination on route change
   *
   * @memberof SearchEffects
   */
  updatePaginationOnUrlChange$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routerNavigatedAction),
      mergeMap(({ type, payload }) => {
        const { url, queryParams } = payload.routerState.root;

        if (url[0].path === "search") {
          const { page = 1, limit = 20 } = queryParams as Search.queryParams;
          return of(searchActions.setPagination({ page, limit }));
        }

        return of(null);
      })
    );
  });

  /**
   *
   *
   * @memberof SearchEffects
   */
  sendRequestOnPaginationChange$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(searchActions.setPagination, searchActions.setFilters),
      concatLatestFrom((action) => [
        this.store.select(selectFilters),
        this.store.select(selectLimit),
        this.store.select(selectCurrentPage),
      ]),
      exhaustMap(([action, filters, limit, page]) =>
        of(
          searchActions.sendRequest({
            filters,
            skip: (page - 1) * limit,
            limit,
          })
        )
      )
    );
  });

  /**
   *
   *
   * @memberof SearchEffects
   */
  fruitsRequest$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(searchActions.sendRequest),
      mergeMap(({ type, ...props }) => {
        return this.fruitSearch.find(props).pipe(
          map((results) => searchActions.requestFulfilled({ results })),
          catchError((error) => of(searchActions.requestRejected({ error })))
        );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private fruitSearch: FruityviceApiService,
    private store: Store
  ) {}

  /**
   * Convert query params in filters
   * @param params
   * @returns
   */
  queryParamsToFilters(params: Partial<Search.queryParams>): Search.filters {
    const { arg: attribute, val, min = 0, max = 1000 } = params;

    if (!attribute) {
      return {};
    }

    const isNutrition = Object.keys(FruitNutritionTypes).includes(val);

    if (isNutrition) {
      return {
        nutrition: {
          type: val as FruitNutritionTypes,
          min,
          max,
        },
      };
    }

    return {
      [attribute]: val,
    };
  }
}
