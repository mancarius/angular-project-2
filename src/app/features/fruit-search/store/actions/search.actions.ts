import { createAction, props } from "@ngrx/store";
import { Search } from "../state/search.state";

export const sendRequest = createAction("[Fruit Search] Send request", props<Search.requestProps>());

export const requestFulfilled = createAction("[Fruit Search] Fulfilled request", props<{ results: Search.state['results'] }>());

export const requestRejected = createAction("[Fruit Search] Rejected request", props<{ error: any }>());

export const setCurrentPage = createAction("[Fruit Search] Set page number", props<{ page: Search.state['currentPage'] }>());

export const setFilters = createAction("[Fruit Search] Set filters", props<{ params: { filters: Search.filters, page: Search.state["currentPage"] } }>());