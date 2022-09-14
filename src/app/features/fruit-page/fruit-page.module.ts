import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import fromFruitPage from "./store";
import { RouterModule } from '@angular/router';
import { fruitPageRoutes } from './fruit-page.routes';
import { FruitPageComponent } from './components/fruit-page/fruit-page.component';


@NgModule({
  declarations: [
    FruitPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(fruitPageRoutes),
    StoreModule.forFeature("search", fromFruitPage.reducer),
    EffectsModule.forFeature([fromFruitPage.effects]),
  ],
})
export class FruitPageModule {}
