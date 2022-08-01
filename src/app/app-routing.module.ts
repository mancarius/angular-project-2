import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Route } from '@enum/route.enum';

const appRoutes: Routes = [
  { path: "", pathMatch: "full", redirectTo: Route.search },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }