import * as coreSelectors from "./search.selectors";
import * as uiSelectors from './search-ui.selectors';

export const {
  selectSearchIsLoading,
  selectLimit,
  selectPage,
  selectResults,
  selectSelectedFruit,
  selectStatus
} = coreSelectors;

export const {
  selectShowFilters,
  selectShowInfo
} = uiSelectors;