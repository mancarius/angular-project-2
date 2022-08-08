import { HTTPRequestStatus } from "@enum/http-request-status.enum";
import { createSelector } from "@ngrx/store";
import { searchFeature } from "../reducers";

const { selectCore } = searchFeature;

export const selectResults = createSelector(
  selectCore,
  (state) => state.results
);

export const selectSelectedFruit = createSelector(
  selectCore,
  (state) => state.selectedFruit
);

export const selectStatus = createSelector(selectCore, (state) => state.status);

export const selectPage = createSelector(selectCore, (state) => state.page);

export const selectLimit = createSelector(selectCore, (state) => state.limit);

export const selectSearchIsLoading = createSelector(
  selectCore,
  (state) => state.status === HTTPRequestStatus.pending
);
