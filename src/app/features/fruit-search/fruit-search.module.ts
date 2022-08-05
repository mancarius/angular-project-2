import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './search.component';
import { searchRoutes } from './search.routing';
import { searchEffects } from './store/effects';
import { FiltersComponent } from './components/filters/filters.component';
import { ListComponent } from './components/list/list.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import * as fromSearch from "@fruit/search/store";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from '@angular/router';
import { MatGridListModule } from "@angular/material/grid-list";


@NgModule({
  declarations: [SearchComponent, FiltersComponent, ListComponent],
  imports: [
    MatGridListModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(searchRoutes),
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    StoreModule.forFeature("search", fromSearch.reducers.searchReducer),
    EffectsModule.forFeature([searchEffects.SearchEffects]),
  ],
  bootstrap: [SearchComponent],
})
export class FruitSearchModule {}
