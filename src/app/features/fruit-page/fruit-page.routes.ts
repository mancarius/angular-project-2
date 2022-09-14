import { FruitPageComponent } from './components/fruit-page/fruit-page.component';
import { Routes } from "@angular/router";
import { Route } from "@enum/route.enum";
import { FruitPageResolver } from "./resolvers/fruit-page.resolver";

export const fruitPageRoutes: Routes = [
  {
    path: Route.fruit,
    title: "fruit",
    children: [
      {
        path: ":fruitName",
        title: "view",
        pathMatch: "full",
        runGuardsAndResolvers: "paramsOrQueryParamsChange",
        resolve: {
          fruit: FruitPageResolver,
        },
        component: FruitPageComponent,
      },
    ],
  },
];
