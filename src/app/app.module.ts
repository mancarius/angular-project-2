import { FruitPageModule } from "./features/fruit-page/fruit-page.module";
import { MockApiModule } from './core/services/mock-api/mock-api.module';
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { appRoutes } from "./app.routing";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { StoreModule } from "@ngrx/store";
import { environment } from "src/environments/environment";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

import { AppComponent } from "./app.component";
import { EffectsModule } from "@ngrx/effects";
import { HttpAbortService } from "./core/services/http-abort/http-abort.service";
import { SearchModule } from "@fruit/search/search.module";
import { APP_BASE_HREF } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { routerReducer, StoreRouterConnectingModule } from "@ngrx/router-store";
import { interceptorProviders } from "./core/interceptors";
import { FruityviceMockApiService } from './core/services/fruityvice-mock-api/fruityvice-mock-api.service';
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { coreReducers } from './core/store/reducers';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SearchModule,
    FruitPageModule,
    MockApiModule.forRoot([FruityviceMockApiService]),
    RouterModule.forRoot(appRoutes, {
      errorHandler: console.error,
    }),
    EffectsModule.forRoot(),
    StoreModule.forRoot({
      router: routerReducer,
      ...coreReducers
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    StoreRouterConnectingModule.forRoot(),
    HttpClientModule,
    MatProgressBarModule,
  ],
  declarations: [AppComponent],
  providers: [
    HttpAbortService,
    { provide: APP_BASE_HREF, useValue: "/" },
    ...interceptorProviders,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
