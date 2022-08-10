import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './search.component';
import { searchRoutes } from './search.routes';
import { searchEffects } from './store/effects';
import { SearchFiltersComponent } from './components/search-filters/search-filters.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import * as fromSearch from "src/app/features/search/store";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from '@angular/router';
import { MatGridListModule } from "@angular/material/grid-list";
import { SearchResultsItemComponent } from './components/search-results/components/search-results-item/search-results-item/search-results-item.component';
import { MatSidenavModule } from "@angular/material/sidenav";
import { DetailsComponent } from './components/details/details/details.component';

@NgModule({
  declarations: [
    SearchComponent,
    SearchFiltersComponent,
    SearchResultsComponent,
    SearchResultsItemComponent,
    DetailsComponent,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(searchRoutes),
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatSidenavModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    StoreModule.forFeature("search", fromSearch.reducers),
    EffectsModule.forFeature([searchEffects.SearchEffects]),
  ],
  bootstrap: [SearchComponent],
})
export class SearchModule {}
