import * as fromSearch from "src/app/features/search/store";
import { Store } from "@ngrx/store";
import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  distinctUntilChanged,
  Observable,
  ReplaySubject,
  Subject,
  takeUntil,
} from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { Route as Routes } from "@enum/route.enum";

@Component({
  selector: "fruity-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit, OnDestroy {
  filters$: Observable<fromSearch.types.filters>;
  results$: Observable<fromSearch.types.results>;
  isLoading$: Observable<boolean> = this._store.select(
    fromSearch.selectors.selectSearchIsLoading
  );
  currentPage$: ReplaySubject<fromSearch.types.state["page"]>;
  requestParams$: ReplaySubject<fromSearch.types.requestParams> =
    new ReplaySubject();
  private _unsubscribeAll$: Subject<any> = new Subject();

  constructor(
    private _store: Store,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    // refresh query params in the url on query params change
    this.requestParams$
      .pipe(
        distinctUntilChanged(
          (prev, curr) => JSON.stringify(prev || {}) === JSON.stringify(curr)
        ),
        takeUntil(this._unsubscribeAll$)
      )
      .subscribe({
        next: ({ filters, ...queryParams }) => {
          // Get argument and value
          const [argument = "all", value] = Object.entries(filters)[0] || [];

          // destructuring value if is an object
          const {
            type = undefined,
            min = undefined,
            max = undefined,
          } = typeof value === "object" ? value : {};

          // compose path
          const path = [
            Routes.search,
            // append params if exist
            ...(() => (argument === "name" ? [] : [argument]))(),
            ...(() => (argument && value ? [type || value] : []))(),
          ];

          // compose query params
          queryParams = {
            ...queryParams,
            ...(() => (typeof min === "undefined" ? { min } : {}))(),
            ...(() => (typeof max === "undefined" ? { max } : {}))(),
          };

          // Navigate to route with params
          this._router.navigate(path, { queryParams });
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  ngOnInit(): void {
    this._route.data
      .pipe(distinctUntilChanged(), takeUntil(this._unsubscribeAll$))
      .subscribe(({ requestParams }) => this.setRequestParams(requestParams));

    this.results$ = this._store.select(fromSearch.reducers.selectResults);
    this.isLoading$ = this._store.select(
      fromSearch.selectors.selectSearchIsLoading
    );
  }

  ngOnDestroy() {
    this._unsubscribeAll$.next(true);
    this._unsubscribeAll$.complete();
  }

  setRequestParams(params: fromSearch.types.requestParams): void {
    this.requestParams$.next(params);
  }
}
