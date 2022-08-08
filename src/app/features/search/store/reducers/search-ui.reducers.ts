import { initialSearchUIState } from '../state/search-ui.state';
import { createFeature, createReducer, on } from "@ngrx/store";
import { searchActions } from "../actions";

export const searchUIReducer = createReducer(
  initialSearchUIState,
  on(searchActions.ui.showFruitInfo, (state, fruit) => ({
    ...state,
    showFilters: false,
    showInfo: true,
  })),
  on(searchActions.ui.hideFruitInfo, (state) => ({
    ...state,
    showFilters: true,
    showInfo: false,
  })),
);

export const searchUIFeature = createFeature({
  name: "searchUI",
  reducer: searchUIReducer,
});

export const {
  selectShowFilters,
  selectShowInfo,
  selectSearchUIState,
} = searchUIFeature;
