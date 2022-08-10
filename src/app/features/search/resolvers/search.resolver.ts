import { FruitAttributes } from "@enum/fruit-attributes.enum";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Store } from "@ngrx/store";
import { distinctUntilChanged, map, Observable, take } from "rxjs";
import { Injectable } from "@angular/core";
import * as fromSearch from "../store";

@Injectable({
  providedIn: "root",
})
export class SearchResolver
  implements Resolve<fromSearch.coreTypes.requestParams>
{
  private _fruits$: Observable<fromSearch.coreTypes.state["results"]>;

  constructor(private _store: Store) {
    this._fruits$ = this._store.select(fromSearch.selectors.selectResults);
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<fromSearch.coreTypes.requestParams>
    | Promise<fromSearch.coreTypes.requestParams>
    | fromSearch.coreTypes.requestParams {
    const { firstParam, secondParam } = route.params;
    const { page = 1, limit = 10, min = 0, max = 1000 } = route.queryParams;
    let filters: fromSearch.coreTypes.filters = {};

    // set filters
    if (firstParam && secondParam) {
      const isNutrition = firstParam === FruitAttributes.nutrition;

      filters = {
        [firstParam]: isNutrition
          ? { type: secondParam, min: Number(min), max: Number(max) }
          : secondParam,
      };
    } else if (firstParam && !secondParam) {
      filters = {
        name: firstParam,
      };
    }

    // send http request
    this._store.dispatch(
      fromSearch.actions.sendRequest({
        filters,
        page: Number(page),
        limit: Number(limit),
      })
    );

    return this._fruits$.pipe(
      take(1),
      map((_) => ({
        filters,
        page: Number(page),
        limit: Number(limit),
      })),
      distinctUntilChanged(
        (prev, next) =>
          JSON.stringify(prev?.filters || {}) !== JSON.stringify(next.filters)
      )
    );
  }
}
