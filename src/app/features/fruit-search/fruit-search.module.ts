import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './search.component';
import { SearchRoutingModule } from './search-routing.module';
import { searchEffects } from './store/effects';
import { FiltersComponent } from './components/filters/filters.component';
import { ListComponent } from './components/list/list.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import * as fromSearch from "@fruit/search/store";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";



@NgModule({
  declarations: [SearchComponent, FiltersComponent, ListComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    SearchRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    StoreModule.forFeature('search', fromSearch.reducers.searchReducer),
    EffectsModule.forFeature([searchEffects.SearchEffects]),
  ],
  bootstrap: [SearchComponent],
})
export class FruitSearchModule {}
