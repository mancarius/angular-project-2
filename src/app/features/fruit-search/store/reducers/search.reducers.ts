import { HTTPRequestStatus } from "@enum/http-request-status.enum";
import { createFeature, createReducer, on } from "@ngrx/store";
import { searchActions } from "../actions";
import { initialSearchState } from "../state/search.state";

export const searchReducer = createReducer(
  initialSearchState,
  on(searchActions.setPagination, (state, { page, limit }) => ({
    ...state,
    ...(() => (typeof page === "number" ? { currentPage: page } : {}))(),
    ...(() => (typeof limit === "number" ? { limit } : {}))(),
  })),
  on(searchActions.setFilters, (state, { type, ...filters }) => ({
    ...state,
    filters,
  })),
  on(searchActions.sendRequest, (state) => ({
    ...state,
    status: HTTPRequestStatus.pending,
  })),
  on(searchActions.requestFulfilled, (state, { results }) => ({
    ...state,
    results,
    status: HTTPRequestStatus.fulfilled,
  })),
  on(searchActions.requestRejected, () => ({
    ...initialSearchState,
    status: HTTPRequestStatus.rejected,
  }))
);

export const searchFeature = createFeature({
  name: "search",
  reducer: searchReducer,
});

export const {
  selectPage,
  selectFilters,
  selectLimit,
  selectResults,
  selectSearchState,
  selectStatus,
} = searchFeature;
