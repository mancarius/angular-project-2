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
import { FruitWithPhoto } from "@type/fruit";
import { searchActions } from "./store/actions";

@Component({
  selector: "fruity-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit, OnDestroy {
  results$: Observable<fromSearch.coreTypes.results>;
  isLoading$: Observable<boolean>;
  currentPage$: ReplaySubject<fromSearch.coreTypes.state["page"]>;
  requestParams$: ReplaySubject<fromSearch.coreTypes.requestParams> =
    new ReplaySubject();
  selectedFruit$: Observable<fromSearch.coreTypes.state["selectedFruit"]>;
  showFruitInfoDrawer$: Observable<fromSearch.uiTypes.state["showInfo"]>;
  showFiltersDrawer$: Observable<fromSearch.uiTypes.state["showFilters"]>;

  private _unsubscribeAll$: Subject<any> = new Subject();

  constructor(
    private _store: Store,
    private _router: Router,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._route.data
      .pipe(distinctUntilChanged(), takeUntil(this._unsubscribeAll$))
      .subscribe(({ requestParams }) => this.setRequestParams(requestParams));

    // Set selectors

    this.results$ = this._store.select(fromSearch.selectors.selectResults);
    this.isLoading$ = this._store.select(
      fromSearch.selectors.selectSearchIsLoading
    );
    this.selectedFruit$ = this._store.select(
      fromSearch.selectors.selectSelectedFruit
    );
    this.showFruitInfoDrawer$ = this._store.select(
      fromSearch.selectors.selectShowInfo
    );
    this.showFiltersDrawer$ = this._store.select(
      fromSearch.selectors.selectShowFilters
    );

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
            ...(() => (typeof min !== "undefined" ? { min } : {}))(),
            ...(() => (typeof max !== "undefined" ? { max } : {}))(),
          };

          // Navigate to route with params
          this._router.navigate(path, { queryParams });
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  ngOnDestroy() {
    this._unsubscribeAll$.next(true);
    this._unsubscribeAll$.complete();
  }

  /**
   * 
   * @param params 
   */
  setRequestParams(params: fromSearch.coreTypes.requestParams): void {
    this.requestParams$.next(params);
  }

  /**
   * 
   * @param fruit 
   */
  showFruitInfo(fruit: FruitWithPhoto) {
    this._store.dispatch(searchActions.selectFruit({ fruit }));
  }

  /**
   * 
   */
  closeFruitInfoDrawer() {
    this._store.dispatch(searchActions.ui.hideFruitInfo());
  }
}
