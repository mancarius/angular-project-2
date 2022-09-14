import { Routes } from "@angular/router";
import { Route } from "@enum/route.enum";
import { SearchComponent } from "./components/search.component";
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
        runGuardsAndResolvers: "always",
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
            runGuardsAndResolvers: "always",
            resolve: {
              requestParams: SearchResolver,
            },
            component: SearchComponent,
          },
          {
            path: ":secondParam",
            title: "nutrition",
            runGuardsAndResolvers: "always",
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
