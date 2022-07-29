import { HTTPRequestStatus } from "@enum/http-request-status.enum";
import { createFeature, createReducer, on } from "@ngrx/store";
import { searchActions } from "../actions";
import { initialSearchState } from "../state/search.state";

export const searchReducer = createReducer(
  initialSearchState,
  on(searchActions.setCurrentPage, (state, { page }) => ({
    ...state,
    currentPage: page,
  })),
  on(searchActions.setFilters, (state, { params }) => ({
    ...state,
    filters: params.filters,
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

export const {
  selectCurrentPage,
  selectFilters,
  selectLimit,
  selectResults,
  selectSearchState,
  selectStatus,
} = createFeature({ name: "search", reducer: searchReducer });
