import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Store } from "@ngrx/store";
import {
  distinctUntilKeyChanged,
  EMPTY,
  lastValueFrom,
  Observable,
  of,
  switchMap,
  take,
} from "rxjs";
import { Injectable } from "@angular/core";
import fromFruityPage from "../store";
import { Fruit } from "@type/fruit";
import { HTTPRequestStatus } from "@enum/http-request-status.enum";

@Injectable({
  providedIn: "root",
})
export class FruitPageResolver implements Resolve<Fruit> {
  private _fruit$: Observable<Fruit>;
  private _requestStatus$: Observable<HTTPRequestStatus>;

  constructor(private _store: Store) {
    this._fruit$ = this._store.select(fromFruityPage.selectFruit);
    this._requestStatus$ = this._store.select(fromFruityPage.selectStatus);
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Fruit> {
    const { fruitId } = route.queryParams;

    // send http request
    this._store.dispatch(
      fromFruityPage.actions.sendRequest({
        id: fruitId,
      })
    );

    /**
     * Subscribe request status changes and
     * cancel router navigation if request is rejected.
     * Otherwise go next.
     */
    return this._requestStatus$.pipe(
      switchMap((nextStatus) => {
        // request fulfilled
        if (nextStatus === HTTPRequestStatus.fulfilled) {
          return this._fruit$.pipe(take(1));
        }
        // request rejected
        else if (nextStatus === HTTPRequestStatus.rejected) {
          return EMPTY;
        }
      })
    );
  }
}
