

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Route } from '@enum/route.enum';
import { SearchComponent } from 'src/app/features/fruit-search/search.component';

export const searchRoutes: Routes = [
  { path: Route.search, component: SearchComponent },
];

@NgModule({
  imports: [RouterModule.forChild(searchRoutes)],
  exports: [RouterModule],
})
export class SearchRoutingModule { }