import { createReducer, on } from "@ngrx/store";
import { coreActions } from "../actions";
import { initialCoreState } from "../state/core.state";

export const coreReducers = createReducer(
  initialCoreState,
  on(coreActions.startLoading, (state) => ({ ...state, isLoading: true })),
  on(coreActions.stopLoading, (state) => ({ ...state, isLoading: false }))
)