import { FruitNutritionTypes } from "@enum/fruit-nutrition-types.enum";
import { ValueOf } from "@type/value-of";
import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { routerNavigatedAction } from "@ngrx/router-store";
import { Store } from "@ngrx/store";
import { mergeMap, map, catchError, of } from "rxjs";
import { searchActions } from "../actions";
import { selectFilters, selectLimit } from "../reducers/search.reducers";
import { FruityviceApiService } from "../services/fruityvice-api/fruityvice-api.service";
import { Search } from "../state";

@Injectable()
export class SearchEffects {
  /**
   *
   *
   * @memberof SearchEffects
   */
  updateFiltersOnUrlChange$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routerNavigatedAction),
      mergeMap(({ type, payload }) => {
        const { url, queryParams } = payload.routerState.root;

        if (url[0].path === "search") {
          const { page = 1, ...params } = queryParams as Search.queryParams;
          return of(
            searchActions.setFilters({
              params: { filters: this.queryParamsToFilters(params), page },
            })
          );
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
  resetPaginationOnFiltersChange$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(searchActions.setFilters),
      mergeMap((action) =>
        of(
          searchActions.setCurrentPage({
            page: 1
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
  sendRequestOnPaginationChange$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(searchActions.setCurrentPage),
      concatLatestFrom((action) => [
        this.store.select(selectFilters),
        this.store.select(selectLimit),
      ]),
      mergeMap(([{page}, filters, limit]) =>
        of(
          searchActions.sendRequest({
            filters,
            page,
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
      mergeMap(({ type, page, ...props }) => {
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
   * Set query params with the given filters
   * @param _filters
   */
  getQuery(
    _filters: Search.filters,
    _page: Search.state["currentPage"] = 1
  ): Partial<Search.queryParams> {
    const [attribute, value] = (Object.entries(_filters)[0] || []) as [
      keyof Search.filters,
      ValueOf<Search.filters>
    ];

    if (typeof attribute === "string" && value) {
      const queryParams: Partial<Search.queryParams> = { page: _page };
      const isNutrition = Object.keys(FruitNutritionTypes).includes(attribute);

      if (isNutrition && typeof value !== "string") {
        const { type, min, max } = value;
        queryParams.arg = attribute;
        queryParams.val = type;
        typeof max === "number" && (queryParams.max = max);
        typeof min === "number" && (queryParams.min = min);
      } else if (typeof value === "string") {
        queryParams.arg = attribute;
        queryParams.val = value;
      }

      return queryParams;
    }

    return {};
  }

  /**
   * Convert query params in filters
   * @param params
   * @returns
   */
  queryParamsToFilters(params: Partial<Search.queryParams>): Search.filters {
    const { arg: attribute, val, min = 0, max = 1000 } = params;

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
