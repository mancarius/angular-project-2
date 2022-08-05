import { Routes } from '@angular/router';
import { Route } from '@enum/route.enum';

export const appRoutes: Routes = [
  { path: "", pathMatch: "full", redirectTo: Route.search },
  { path: "**", redirectTo: "" },
];