import { HTTPRequestStatus } from "@enum/http-request-status.enum";
import { Fruit } from "@type/fruit";
import { FruitNutritionTypes } from "src/app/shared/enums/fruit-nutrition-types.enum";

export namespace SearchUI {
  export interface state {
    showFilters: boolean;
    showInfo: boolean;
  }
}

export const initialSearchUIState: SearchUI.state = {
  showFilters: true,
  showInfo: false
};
