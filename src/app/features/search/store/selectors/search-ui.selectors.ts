import { createSelector } from "@ngrx/store";
import { searchFeature } from "../reducers";

const { selectUi } = searchFeature;

export const selectShowInfo = createSelector(selectUi, (state) => state.showInfo);

export const selectShowFilters = createSelector(
  selectUi,
  (state) => state.showFilters
);
