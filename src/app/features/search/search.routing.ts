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
        pathMatch: "full",
        title: "attribute",
        resolve: {
          requestParams: SearchResolver,
        },
        component: SearchComponent,
        children: [
          {
            path: ":secondParam",
            //pathMatch: "full",
            title: "nutrition",
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
