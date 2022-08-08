import { searchCoreReducer } from "./search.reducers";
import { searchUIReducer } from "./search-ui.reducers";
import { combineReducers, createFeature } from "@ngrx/store";

export const searchReducers = combineReducers({
  core: searchCoreReducer,
  ui: searchUIReducer,
});

export const searchFeature = createFeature({
  name: "search",
  reducer: searchReducers,
});
