import { createAction, props } from "@ngrx/store";
import { Core } from "../state/core.state";

export const startLoading = createAction("[Fruit Core] Loading");

export const stopLoading = createAction("[Fruit Core] Loading stop");

export const setItems = createAction("[Fruit Core] Set items", props<{ items: Core.state["items"] }>())