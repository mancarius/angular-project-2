import { ValueOf } from "@type/value-of";
import * as fromSearch from "@fruit/search/store";
import { Store } from "@ngrx/store";
import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  combineLatest,
  distinctUntilChanged,
  map,
  Observable,
  ReplaySubject,
  Subject,
  Subscription,
} from "rxjs";
import { FruitNutritionTypes } from "@enum/fruit-nutrition-types.enum";
import { ActivatedRoute, Router } from "@angular/router";
import { Route as Routes } from "@enum/route.enum";

@Component({
  selector: "fruity-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
})
export class SearchComponent implements OnInit, OnDestroy {
  filters$: Observable<fromSearch.types.filters>;
  results$: Observable<fromSearch.types.results>;
  isLoading$: Observable<boolean> = this.store.select(fromSearch.selectors.selectSearchIsLoading);
  currentPage$: ReplaySubject<fromSearch.types.state["currentPage"]>;
  queryParams$: ReplaySubject<Partial<fromSearch.types.queryParams>> =
    new ReplaySubject();
  subscriptions: Subscription[] = [];

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // refresh query params in the url on query params change
    this.subscriptions.push(
      this.queryParams$.pipe(distinctUntilChanged()).subscribe({
        next: (queryParams) => {
          this.router.navigate([Routes.search], { queryParams });
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {},
      })
    );
  }

  ngOnInit(): void {
    /*this.subscriptions.push(
      combineLatest([
        this.store.select(fromSearch.reducers.selectFilters),
        this.store.select(fromSearch.reducers.selectCurrentPage),
        this.store.select(fromSearch.reducers.selectLimit),
      ])
        .pipe(
          map(([filters, page, limit]) => {
            return { page, limit, ...this._filtersToQueryParams(filters) };
          }),
          distinctUntilChanged()
        )
        .subscribe({
          next: this.queryParams$.next,
        })
    );*/
    this.subscriptions.push(
      this.route.queryParams.pipe(distinctUntilChanged()).subscribe({
        next: (params) => this.setQueryParams(params),
      })
    );

    this.results$ = this.store.select(fromSearch.reducers.selectResults);
    this.isLoading$ = this.store.select(
      fromSearch.selectors.selectSearchIsLoading
    );
  }

  /**
   * Set query params with the given filters
   * @param _filters
   */
  private _filtersToQueryParams(_filters: fromSearch.types.filters) {
    const [attribute, value] = (Object.entries(_filters)[0] || []) as [
      keyof fromSearch.types.filters,
      ValueOf<fromSearch.types.filters>
    ];

    if (typeof attribute === "string" && value) {
      const queryParams: Partial<fromSearch.types.queryParams> = {};
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
   *
   * @param params
   */
  setQueryParams(params: fromSearch.types.queryParams) {
    if (params.arg !== "nutrition") {
      delete params.max;
      delete params.min;
    }

    this.queryParams$.next({page: 1, limit: 10, ...params});
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
