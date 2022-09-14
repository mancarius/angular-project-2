import { createFeature } from '@ngrx/store';
import * as state from "./state/index";
import * as actions from "./actions";
import * as reducers from "./reducers";
import effects from "./effects";

export default {
  state,
  actions,
  reducers,
  effects,
  ...createFeature({
    name: "fruitPage",
    reducer: reducers.fruitReducer
  })
};
