import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './search.component';
import { SearchRoutingModule } from './search-routing.module';
import { searchEffects } from './store/effects';
import { FiltersComponent } from './components/filters/filters.component';



@NgModule({
  declarations: [
    SearchComponent,
    FiltersComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SearchRoutingModule,
    EffectsModule.forFeature([searchEffects.SearchEffects])
  ],
  bootstrap: [SearchComponent]
})
export class SearchModule { }
