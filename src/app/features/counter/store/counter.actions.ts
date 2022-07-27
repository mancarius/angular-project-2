import { createAction } from '@ngrx/store';

export const preIncrement = createAction('[Counter Component] Pre increment');
export const increment = createAction('[Counter Component] Increment');
export const decrement = createAction('[Counter Component] Decrement');
export const reset = createAction('[Counter Component] Reset');
