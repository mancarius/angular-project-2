import { FruitNutritionTypes } from "@enum/fruit-nutrition-types.enum"
import { Photo } from "pexels"

export interface Fruit {
  genus: string,
  name: string,
  id: number,
  family: string,
  order: string,
  nutritions: Record<FruitNutritionTypes, number>
}

export interface FruitWithPhoto extends Fruit {
  photo: Photo
}