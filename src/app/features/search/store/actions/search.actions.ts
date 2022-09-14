import { createAction, props } from "@ngrx/store";
import { FruitWithPhoto } from "@type/fruit";
import { Search } from "../state/search.state";

export const sendRequest = createAction(
  "[Search Page] Send request",
  props<Search.requestParams>()
);

export const requestFulfilled = createAction(
  "[Search Page] Fulfilled request",
  props<{ results: Search.state["results"] }>()
);

export const requestRejected = createAction(
  "[Search Page] Rejected request",
  props<{ error: any }>()
);

export const setPagination = createAction(
  "[Search Page] Set pagination",
  props<{ page?: Search.state["page"]; limit?: Search.state["limit"] }>()
);

export const setFilters = createAction(
  "[Search Page] Set filters",
  props<Search.filters>()
);

export const selectFruit = createAction(
  "[Search Page] Select fruit",
  props<{ fruit: FruitWithPhoto }>()
);
