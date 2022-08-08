import { createAction, props } from "@ngrx/store";
import { FruitWithPhoto } from "@type/fruit";
import { Search } from "../state/search.state";

export const sendRequest = createAction(
  "[Fruit Search] Send request",
  props<Search.requestParams>()
);

export const requestFulfilled = createAction(
  "[Fruit Search] Fulfilled request",
  props<{ results: Search.state["results"] }>()
);

export const requestRejected = createAction(
  "[Fruit Search] Rejected request",
  props<{ error: any }>()
);

export const setPagination = createAction(
  "[Fruit Search] Set pagination",
  props<{ page?: Search.state["page"]; limit?: Search.state["limit"] }>()
);

export const setFilters = createAction(
  "[Fruit Search] Set filters",
  props<Search.filters>()
);

export const selectFruit = createAction(
  "[Fruit Search] Select fruit",
  props<{ fruit: FruitWithPhoto }>()
);
