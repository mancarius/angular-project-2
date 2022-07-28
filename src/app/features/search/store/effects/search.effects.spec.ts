import { TestBed } from '@angular/core/testing';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { SearchEffects } from './search.effects';
import { routerNavigatedAction, ROUTER_NAVIGATED } from '@ngrx/router-store';
import { TestScheduler } from 'rxjs/testing';
import { searchActions } from '../actions';
import { HttpClient } from '@angular/common/http';
import { FruityviceApiService } from '../services/fruityvice-api/fruityvice-api.service';
import { coreActions } from 'src/app/core/store/actions';

describe('SearchEffects', () => {
  let actions$ = new Observable<Action>();
  let effects: SearchEffects;
  let testScheduler: TestScheduler;
  let FruityviceApiServiceSpy: jasmine.SpyObj<FruityviceApiService>;

  beforeEach(async () => {
    FruityviceApiServiceSpy = jasmine.createSpyObj('FruityviceApiService', ['find']);

    TestBed.configureTestingModule({
      providers: [
        provideMockActions(() => actions$),
        SearchEffects,
        { provide: FruityviceApiService, useValue: FruityviceApiServiceSpy }]
    });

    effects = TestBed.inject<SearchEffects>(SearchEffects);
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  describe('sendRequestOnUrlChange', () => {

    it("should return action type '[Fruit Search] Send request' when route is 'search' and null with other routes", () => {
      testScheduler.run((helpers) => {
        const { hot, expectObservable } = helpers;

        actions$ = hot('-a-b', {
          a: { type: ROUTER_NAVIGATED, payload: { routerState: { root: { url: [{ path: "search" }], queryParams: {} } } } },
          b: { type: ROUTER_NAVIGATED, payload: { routerState: { root: { url: [{ path: "foo" }], queryParams: {} } } } }
        });

        expectObservable(effects.sendRequestOnUrlChange$).toBe('-c-d', {
          c: searchActions.sendRequest({ skip: 0, limit: 10, filters: {} }),
          d: null
        })
      })
    })
  });

  describe('fruitsRequest', () => {

    it("should return action '[Fruit Search] Fulfilled request' on '[Fruit Search] Send request'", () => {
      testScheduler.run((helpers) => {
        const { hot, cold, expectObservable } = helpers;

        actions$ = hot('-a', {
          a: searchActions.sendRequest({ filters: {} }),
        });

        FruityviceApiServiceSpy.find.and.returnValue(cold('--b|', { b: [] }));

        expectObservable(effects.fruitsRequest$).toBe('---c', {
          c: searchActions.requestFulfilled({ results: [] })
        })
      })
    })
  });

  describe('saveFruits', () => {

    it("should return action '[Fruit Core] Set items' on '[Fruit Search] Fulfilled request'", () => {
      testScheduler.run((helpers) => {
        const { hot, cold, expectObservable } = helpers;

        actions$ = hot('-a', {
          a: searchActions.requestFulfilled({ results: [] }),
        });

        expectObservable(effects.saveFruits$).toBe('-c', {
          c: coreActions.setItems({ items: [] })
        })
      })
    })
  });
});