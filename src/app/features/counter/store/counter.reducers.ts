import { createFeature, createReducer, on } from '@ngrx/store';
import { increment, decrement, reset } from './counter.actions';

export interface CounterState {
  count: number;
}

export const initialCounterState = {
  count: 0,
};

export const counterFeatureKey = "counter";

export const counterReducer = createReducer(
  initialCounterState,
  on(increment, (state) => ({ ...state, count: state.count + 1 }) ),
  on(decrement, (state) => ({ ...state, count: state.count - 1 }) ),
  on(reset, (state) => ({ ...state, count: 0 }))
);

export const counterFeature = createFeature({
  name: counterFeatureKey,
  reducer: counterReducer
});

export const { selectCount } = counterFeature;