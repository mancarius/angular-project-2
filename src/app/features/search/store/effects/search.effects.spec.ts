import { HttpAbortService } from '../../../../core/services/http-abort/http-abort.service';
import { FruitNutritionTypes } from "@enum/fruit-nutrition-types.enum";
import { TestBed } from "@angular/core/testing";
import { Action, StoreModule } from "@ngrx/store";
import { Observable, of, throwError } from "rxjs";
import { provideMockActions } from "@ngrx/effects/testing";
import { SearchEffects } from "./search.effects";
import { ROUTER_NAVIGATION } from "@ngrx/router-store";
import { TestScheduler } from "rxjs/testing";
import { searchActions } from "../actions";
import { FruityviceApiService } from "../services/fruityvice-api/fruityvice-api.service";
import { searchReducers } from "../reducers";
import { Search } from "../state";

describe("SearchEffects", () => {
  let actions$ = new Observable<Action>();
  let effects: SearchEffects;
  let testScheduler: TestScheduler;
  let FruityviceApiServiceSpy: jasmine.SpyObj<FruityviceApiService>;
  let HttpAbortServiceMock: jasmine.SpyObj<HttpAbortService>;

  beforeEach(async () => {
    HttpAbortServiceMock = jasmine.createSpyObj('HttpAbortService', ['abortPendingRequests']);
    HttpAbortServiceMock.abortPendingRequests.and.stub();
    FruityviceApiServiceSpy = jasmine.createSpyObj("FruityviceApiService", [
      "find",
    ]);

    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({ search: searchReducers.searchReducer })],
      providers: [
        provideMockActions(() => actions$),
        SearchEffects,
        { provide: FruityviceApiService, useValue: FruityviceApiServiceSpy },
        { provide: HttpAbortService, useValue: FruityviceApiServiceSpy },
      ],
    });

    effects = TestBed.inject<SearchEffects>(SearchEffects);
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*describe("abortHttpRequestOnUrlChange", () => {
    it("should call abort function", (done) => {
      actions$ = of({
        type: ROUTER_NAVIGATION,
        payload: {
          routerState: {
            root: {
              firstChild: {
                routeConfig: { path: "search" },
                queryParams: { page: 3 },
              },
            },
          },
        },
      });

      effects.abortHttpRequestOnUrlChange$.subscribe({
        next: (action) => {
          expect(HttpAbortServiceMock.abortPendingRequests).toHaveBeenCalledTimes(1);
          done();
        }
      })
    })
  });*/

  /*describe("#updateFiltersOnUrlChange", () => {
    it("should return action type '[Fruit Search] Set filters' when route is 'search' and null with other routes", () => {
      testScheduler.run((helpers) => {
        const { hot, expectObservable } = helpers;

        actions$ = hot("-a-b", {
          a: {
            type: ROUTER_NAVIGATION,
            payload: {
              routerState: {
                root: {
                  firstChild: {
                    routeConfig: { path: "search" },
                    queryParams: { page: 3 },
                  },
                },
              },
            },
          },
          b: {
            type: ROUTER_NAVIGATION,
            payload: {
              routerState: {
                root: {
                  firstChild: { routeConfig: { path: "foo" }, queryParams: {} },
                },
              },
            },
          },
        });

        expectObservable(effects.updateFiltersOnUrlChange$).toBe("-c-d", {
          c: searchActions.setFilters({}),
          d: null,
        });
      });
    });
  });*/

  /*describe("#sendRequestOnPaginationChange", () => {
    it("should return action '[Fruit Search] Send request' on '[Fruit Search] Set page number'", () => {
      testScheduler.run((helpers) => {
        const { hot, expectObservable } = helpers;

        actions$ = hot("-a", {
          a: searchActions.setPagination({ page: 2 }),
        });

        expectObservable(effects.sendRequestOnPaginationChange$).toBe("-c", {
          c: searchActions.sendRequest({ filters: {}, skip: 0, limit: 20 }),
        });
      });
    });
  });*/

  describe("#fruitsRequest", () => {
    it("should return action '[Fruit Search] Fulfilled request' on '[Fruit Search] Send request'", () => {
      testScheduler.run((helpers) => {
        const { hot, cold, expectObservable } = helpers;

        actions$ = hot("-a", {
          a: searchActions.sendRequest({ skip: 0, limit: 10, filters: {} }),
        });

        FruityviceApiServiceSpy.find.and.returnValue(
          cold("--b|", { b: { items: [], count: 0 } })
        );

        expectObservable(effects.fruitsRequest$).toBe("---c", {
          c: searchActions.requestFulfilled({
            results: { items: [], count: 0 },
          }),
        });
      });
    });

    it("should return action '[Fruit Core] Rejected request' on error", () => {
      testScheduler.run((helpers) => {
        const { hot, cold, expectObservable } = helpers;

        actions$ = hot("a", {
          a: searchActions.sendRequest({ skip: 0, limit: 10, filters: {} }),
        });

        FruityviceApiServiceSpy.find.and.returnValue(
          throwError(() => new Error("Fake error"))
        );

        expectObservable(effects.fruitsRequest$).toBe("c", {
          c: searchActions.requestRejected({ error: new Error("Fake error") }),
        });
      });
    });
  });

  describe("#_queryParamsToFilters", () => {
    it("should convert nutrition queryParams to corresponding filters", () => {
      const mockQueryParams: Partial<Search.queryParams> = {
        arg: "nutrition",
        val: FruitNutritionTypes.calories,
        min: 150,
      };
      const expectedFilters: Search.filters = {
        nutrition: { type: FruitNutritionTypes.calories, min: 150, max: 1000 },
      };

      expect(effects["_queryParamsToFilters"](mockQueryParams)).toEqual(
        expectedFilters
      );
    });

    it("should convert generic queryParams to corresponding filters", () => {
      const mockQueryParams: Partial<Search.queryParams> = {
        arg: "name",
        val: "banana",
      };
      const expectedFilters: Search.filters = {
        name: "banana",
      };

      expect(effects["_queryParamsToFilters"](mockQueryParams)).toEqual(
        expectedFilters
      );
    });

    it("should convert invalid queryParams to empty object", () => {
      const mockQueryParams: Partial<Search.queryParams> = {
        arg: "",
        val: "banana",
      };
      const expectedFilters: Search.filters = {};

      expect(effects["_queryParamsToFilters"](mockQueryParams)).toEqual(
        expectedFilters
      );
    });
  });
});
