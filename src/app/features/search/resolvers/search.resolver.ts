import { Search } from "src/app/features/search/store/state";
import { FruitAttributes } from "@enum/fruit-attributes.enum";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Store } from "@ngrx/store";
import * as fromSearch from "src/app/features/search/store";
import { map, Observable, take } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SearchResolver implements Resolve<Search.requestParams> {
  private _fruits$: Observable<Search.state["results"]>;

  constructor(private _store: Store) {
    this._fruits$ = this._store.select(fromSearch.reducers.selectResults);
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<Search.requestParams>
    | Promise<Search.requestParams>
    | Search.requestParams {
    const { firstParam, secondParam } = route.params;
    const { page = 1, limit = 10, min = 0, max = 1000 } = route.queryParams;
    let filters: Search.filters = {};

    // set filters
    if (firstParam && secondParam) {
      const isNutrition = firstParam === FruitAttributes.nutrition;

      filters = {
        [firstParam]: isNutrition
          ? { type: secondParam, min, max }
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
        page,
        limit,
      })
    );

    return this._fruits$.pipe(
      take(1),
      map((_) => ({
        filters,
        page,
        limit,
      }))
    );
  }
}
