import { ValueOf } from "@type/value-of";
import * as fromSearch from "@fruit/search/store";
import { Store } from "@ngrx/store";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, ReplaySubject, Subject, Subscription } from "rxjs";
import { FruitNutritionTypes } from "@enum/fruit-nutrition-types.enum";
import { Router, ActivatedRoute } from "@angular/router";
import { Route as Routes } from "@enum/route.enum";

@Component({
  selector: "fruit-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
})
export class SearchComponent implements OnInit, OnDestroy {
  filters$: Observable<fromSearch.types.filters>;
  results$: Observable<fromSearch.types.results>;
  isLoading$: Observable<boolean>;
  currentPage$: ReplaySubject<fromSearch.types.state["currentPage"]>;
  queryParams$: Subject<Partial<fromSearch.types.queryParams>> = new Subject();
  subscriptions: Subscription[] = [];

  constructor(
    private store: Store,
    private router: Router,
  ) {
    // convert currentPage selector in replayObject
    this.subscriptions.push(
      this.store
        .select(fromSearch.reducers.selectCurrentPage)
        .subscribe(this.currentPage$)
    );

    // refresh query params in the url on query params change
    this.subscriptions.push(
      this.queryParams$.subscribe({
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
    this.filters$ = this.store.select(fromSearch.reducers.selectFilters);
    this.results$ = this.store.select(fromSearch.reducers.selectResults);
    this.isLoading$ = this.store.select(
      fromSearch.selectors.selectSearchIsLoading
    );
  }

  /**
   * Set query params with the given filters
   * @param _filters
   */
  setQuery(_filters: fromSearch.types.filters): void {
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

      this.queryParams$.next(queryParams);
    }
  }

  setPagination() {}

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
