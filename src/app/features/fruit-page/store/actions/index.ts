import { createAction, props } from "@ngrx/store";
import { Fruit } from "@type/fruit";

export const sendRequest = createAction(
  "[Fruit Page] Fetch fruit",
  props<{ id: number }>()
);

export const requestFulfilled = createAction(
  "[Fruit Page] Fulfilled request",
  props<{ fruit: Fruit }>()
);

export const requestRejected = createAction(
  "[Fruit Page] Rejected request",
  props<{ error: any }>()
);
