import { createReducer, on } from "@ngrx/store";
import { coreActions } from "../actions";
import { initialCoreState } from "../state/core.state";

export const loaderReducer = createReducer(
  initialCoreState.isLoading,
  on(coreActions.startLoading, (state) => true),
  on(coreActions.stopLoading, (state) => false)
)