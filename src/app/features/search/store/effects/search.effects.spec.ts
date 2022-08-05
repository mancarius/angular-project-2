import { HttpAbortService } from '../../../../core/services/http-abort/http-abort.service';
import { TestBed } from "@angular/core/testing";
import { Action, StoreModule } from "@ngrx/store";
import { Observable, throwError } from "rxjs";
import { provideMockActions } from "@ngrx/effects/testing";
import { SearchEffects } from "./search.effects";
import { TestScheduler } from "rxjs/testing";
import { searchActions } from "../actions";
import { FruityviceApiService } from "../services/fruityvice-api/fruityvice-api.service";
import { searchReducers } from "../reducers";

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

  describe("#fruitsRequest", () => {
    it("should return action '[Fruit Search] Fulfilled request' on '[Fruit Search] Send request'", () => {
      testScheduler.run((helpers) => {
        const { hot, cold, expectObservable } = helpers;

        actions$ = hot("-a", {
          a: searchActions.sendRequest({ page: 1, limit: 10, filters: {} }),
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
        const { hot, expectObservable } = helpers;

        actions$ = hot("a", {
          a: searchActions.sendRequest({ page: 1, limit: 10, filters: {} }),
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
});
