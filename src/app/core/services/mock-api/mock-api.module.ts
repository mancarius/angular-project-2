import { APP_INITIALIZER, ModuleWithProviders, NgModule } from "@angular/core";
import { MOCK_API_DEFAULT_DELAY } from "./mock-api.constants";

@NgModule()
export class MockApiModule {
  /**
   * FuseMockApi module default configuration.
   *
   * @param mockApiServices - Array of services that register mock API handlers
   * @param config - Configuration options
   * @param config.delay - Default delay value in milliseconds to apply all responses
   */
  static forRoot(
    mockApiServices: any[],
    config?: { delay?: number }
  ): ModuleWithProviders<MockApiModule> {
    return {
      ngModule: MockApiModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          deps: [...mockApiServices],
          useFactory: () => (): any => null,
          multi: true,
        },
        {
          provide: MOCK_API_DEFAULT_DELAY,
          useValue: config?.delay ?? 0,
        },
      ],
    };
  }
}
