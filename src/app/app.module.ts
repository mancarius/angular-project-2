import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { CounterModule } from './features/counter/counter.module';
import { EffectsModule } from '@ngrx/effects';
import { HttpAbortService } from './core/services/http-abort.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ManageHttpInterceptor } from './core/interceptors/manage-http.interceptor';

@NgModule({
  imports: [
    CounterModule,
    BrowserModule,
    AppRoutingModule,
    EffectsModule.forRoot(),
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    })],
  declarations: [AppComponent],
  providers: [
    HttpAbortService,
    { provide: HTTP_INTERCEPTORS, useClass: ManageHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
