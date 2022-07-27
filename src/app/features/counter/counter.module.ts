import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { CounterComponent } from './counter.component';
import { counterFeature } from './store/counter.reducers';
import { EffectsModule } from '@ngrx/effects';
import { CounterEffects } from './store/counter.effects';



@NgModule({
  declarations: [CounterComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(counterFeature),
    EffectsModule.forFeature([CounterEffects])
  ],
  exports: [CounterComponent],
  bootstrap: [CounterComponent]
})
export class CounterModule { }
