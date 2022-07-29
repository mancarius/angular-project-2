

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Route } from '@enum/route.enum';
import { SearchComponent } from 'src/app/features/fruit-search/search.component';
import { CounterComponent } from './features/counter/counter.component';

const appRoutes: Routes = [
  { path: '', redirectTo: Route.search },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }