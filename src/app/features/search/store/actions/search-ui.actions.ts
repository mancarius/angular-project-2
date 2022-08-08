import { createAction, props } from "@ngrx/store";

export const showFruitInfo = createAction(
  "[Fruit Search UI] Show fruit info drawer and hide filters drawer"
);

export const hideFruitInfo = createAction(
  "[Fruit Search] Hide fruit info drawer and show filters drawer"
);
