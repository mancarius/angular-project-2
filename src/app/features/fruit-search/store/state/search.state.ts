import { HTTPRequestStatus } from "@enum/http-request-status.enum";
import { Fruit } from "@type/fruit";
import { FruitNutritionTypes } from "src/app/shared/enums/fruit-nutrition-types.enum";

export namespace Search {
  export interface state {
    filters: filters;
    results: results;
    status: HTTPRequestStatus;
    limit: number;
    currentPage: number;
  }

  export interface filters {
    name?: string;
    nutrition?: nutritionProps;
    family?: Fruit["family"];
    genus?: Fruit["genus"];
    order?: Fruit["order"];
  }

  export interface results {
    items: Fruit[];
    count: number;
  }

  export interface nutritionProps {
    type: FruitNutritionTypes;
    min?: number;
    max?: number;
  }

  export interface queryParams {
    arg?: string;
    val?: string;
    min?: number;
    max?: number;
    page: number;
  }

  export interface requestProps
    extends Partial<Omit<Search.state, "results" | "status" | "filters" | "currentPage">> {
    filters: Search.state["filters"];
    skip?: number;
    page: number;
  }
}

export const initialSearchState: Search.state = {
  filters: {},
  results: {
    items: [],
    count: 0,
  },
  status: HTTPRequestStatus.pristine,
  limit: 20,
  currentPage: 1
};
