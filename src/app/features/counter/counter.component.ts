import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { counterFeatureKey, CounterState, selectCount } from './store/counter.reducers';
import { decrement, preIncrement, reset } from './store/counter.actions';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css'],
})
export class CounterComponent {
  count$: Observable<CounterState['count']>;

  constructor(private counterStore: Store<{ [counterFeatureKey]: CounterState }>) {
    this.count$ = counterStore.select(selectCount);
  }

  ngOnInit() {
    this.count$.subscribe((v) => {
      console.log("Has changed:", v)
    });
  }

  increment() {
    this.counterStore.dispatch(preIncrement());
  }

  decrement() {
    this.counterStore.dispatch(decrement());
  }

  reset() {
    this.counterStore.dispatch(reset());
  }
}
