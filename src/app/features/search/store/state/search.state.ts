import { HTTPRequestStatus } from "@enum/http-request-status.enum";
import { Fruit } from "@type/fruit";
import { FruitNutritionTypes } from "src/app/shared/enums/fruit-nutrition-types.enum";

export namespace Search {

  export interface state {
    filters: filters,
    results: Fruit[],
    status: HTTPRequestStatus,
    skip: number,
    limit: number,
    currentPage: number
  }

  export interface filters {
    name?: string,
    nutrition?: nutritionProps,
    family?: Fruit['family'],
    genus?: Fruit['genus'],
    order?: Fruit['order']
  }

  export interface nutritionProps {
    type: FruitNutritionTypes,
    min?: number,
    max?: number
  }

  export interface requestProps extends Partial<Omit<Search.state, "results" | "status" | "filters">> { filters: Search.state["filters"] }
}


export const initialSearchState: Search.state = {
  filters: {},
  results: [],
  status: HTTPRequestStatus.pristine,
  skip: 0,
  limit: 20,
  currentPage: 1
}