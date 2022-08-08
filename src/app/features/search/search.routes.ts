import { Routes } from "@angular/router";
import { Route } from "@enum/route.enum";
import { SearchComponent } from "src/app/features/search/search.component";
import { SearchResolver } from "./resolvers/search.resolver";

export const searchRoutes: Routes = [
  {
    path: Route.search,
    title: "fruits",
    children: [
      {
        path: "all",
        pathMatch: "full",
        title: "All fruits",
        resolve: {
          requestParams: SearchResolver,
        },
        component: SearchComponent,
      },
      {
        path: ":firstParam",
        title: "attribute",
        children: [
          {
            path: "",
            pathMatch: "full",
            title: "nutrition",
            runGuardsAndResolvers: "pathParamsOrQueryParamsChange",
            resolve: {
              requestParams: SearchResolver,
            },
            component: SearchComponent,
          },
          {
            path: ":secondParam",
            pathMatch: "full",
            title: "nutrition",
            runGuardsAndResolvers: "pathParamsOrQueryParamsChange",
            resolve: {
              requestParams: SearchResolver,
            },
            component: SearchComponent,
          },
        ],
      },
      {
        path: "",
        redirectTo: "all",
        pathMatch: "full",
      },
    ],
  },
];
