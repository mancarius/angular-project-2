import { createAction, props } from "@ngrx/store";
import { Search } from "../state/search.state";

export const sendRequest = createAction("[Fruit Search] Send request", props<Search.requestProps>());

export const requestFulfilled = createAction("[Fruit Search] Fulfilled request", props<{ results: Search.state['results'] }>());

export const requestRejected = createAction("[Fruit Search] Rejected request", props<{ error: any }>());

export const setPagination = createAction("[Fruit Search] Set pagination", props<{ page?: Search.state['currentPage'], limit?: Search.state["limit"] }>());

export const setFilters = createAction("[Fruit Search] Set filters", props<Search.filters>());