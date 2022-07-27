import { HTTPRequestStatus } from "@enum/http-request-status.enum";
import { createReducer, on } from "@ngrx/store";
import { searchActions } from "../actions";
import { initialSearchState } from "../state/search.state";

export const searchReducers = createReducer(
  initialSearchState,
  on(searchActions.sendRequest, (state) => ({ ...state, status: HTTPRequestStatus.pending })),
  on(searchActions.requestFulfilled, (state) => ({ ...state, status: HTTPRequestStatus.fulfilled })),
  on(searchActions.requestRejected, (state) => ({ ...state, status: HTTPRequestStatus.rejected }))
)