import { FruitNutritionTypes } from "@enum/fruit-nutrition-types.enum"

export interface Fruit {
  genus: string,
  name: string,
  id: number,
  family: string,
  order: string,
  nutritions: Record<FruitNutritionTypes, number>
}