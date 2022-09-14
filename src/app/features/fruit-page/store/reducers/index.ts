import { createReducer, on } from "@ngrx/store";
import { initialFruitPageState } from "../state";
import * as FruitPageActions from "../actions";
import { HTTPRequestStatus } from "@enum/http-request-status.enum";

export const fruitReducer = createReducer(
  initialFruitPageState,

  /**
   * Send request
   */
  on(FruitPageActions.sendRequest, (state) => ({
    ...state,
    status: HTTPRequestStatus.pending,
  })),

  /**
   * Request fulfilled
   */
  on(FruitPageActions.requestFulfilled, (state, { fruit }) => ({
    ...state,
    fruit,
    status: HTTPRequestStatus.fulfilled,
  })),

  /**
   * Request rejected
   */
  on(FruitPageActions.requestRejected, (_, { error }) => ({
    ...initialFruitPageState,
    status: HTTPRequestStatus.rejected,
    error:
      error instanceof Error
        ? error.message
        : typeof error === "string"
        ? error
        : null,
  }))
);
