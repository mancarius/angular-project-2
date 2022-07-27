import { createAction, props } from "@ngrx/store";
import { Search } from "../state/search.state";

export const sendRequest = createAction("[Fruit Search] Send request", props<Search.requestProps>());

export const requestFulfilled = createAction("[Fruit Search] Fulfilled request", props<{ results: Search.state['results'] }>());

export const requestRejected = createAction("[Fruit Search] Rejected request", props<{error: any}>())