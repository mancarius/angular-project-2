import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { delay, exhaustMap, map, NEVER, of, startWith, tap } from "rxjs";
import { preIncrement, increment } from "./counter.actions";
import { CounterState } from "./counter.reducers";

@Injectable()
export class CounterEffects {
  count$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(preIncrement),
      exhaustMap(() => of('').pipe(map(() => increment()), delay(1000)))
    )
  });

  constructor(private actions$: Actions, private counterState: Store<CounterState>) { }
}