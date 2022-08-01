import { RouterModule } from '@angular/router';
import { AppRoutingModule } from "./app-routing.module";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { StoreModule } from "@ngrx/store";
import { environment } from "src/environments/environment";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

import { AppComponent } from "./app.component";
import { CounterModule } from "./features/counter/counter.module";
import { EffectsModule } from "@ngrx/effects";
import { HttpAbortService } from "./core/services/http-abort.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ManageHttpInterceptor } from "./core/interceptors/manage-http.interceptor";
import { FruitSearchModule } from "@fruit/search/fruit-search.module";
import { APP_BASE_HREF } from "@angular/common";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routerReducer, StoreRouterConnectingModule } from "@ngrx/router-store";

@NgModule({
  imports: [
    CounterModule,
    FruitSearchModule,
    BrowserModule,
    AppRoutingModule,
    EffectsModule.forRoot(),
    StoreModule.forRoot({
      router: routerReducer,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    BrowserAnimationsModule,
    RouterModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
  ],
  declarations: [AppComponent],
  providers: [
    HttpAbortService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ManageHttpInterceptor,
      multi: true,
    },
    { provide: APP_BASE_HREF, useValue: "/" },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
