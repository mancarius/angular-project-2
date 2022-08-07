import { FRUITYVICE_MOCK_FRUITS as fruitsData } from "./../../../shared/mocks/fruityvice-mocks";
import { Injectable } from "@angular/core";
import { cloneDeep } from "lodash";
import { MockApiService } from "../mock-api/mock-api.service";

@Injectable({
  providedIn: "root",
})
export class FruityviceMockApiService {
  private _fruits: Record<string, any>[] = fruitsData;

  /**
   * Constructor
   */
  constructor(private _mockApiService: MockApiService) {
    // Register Mock API handlers
    this.registerHandlers();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Register Mock API handlers
   */
  registerHandlers(): void {
    // -----------------------------------------------------------------------------------------------------
    // @ All - GET
    // -----------------------------------------------------------------------------------------------------
    this._mockApiService
      .onGet("https://www.fruityvice.com/api/fruit/all", 3000)
      .reply(({ request }) => {
        // Clone the mails mock-api to prevent accidental mock-api updates
        const fruits = cloneDeep(this._fruits);

        return [200, fruits];
      });

    // -----------------------------------------------------------------------------------------------------
    // @ name - GET
    // -----------------------------------------------------------------------------------------------------
    this._mockApiService
      .onGet("https://www.fruityvice.com/api/fruit/banana" , 3000)
      .reply(({ request }) => {
        // Clone the mails mock-api to prevent accidental mock-api updates
        const fruits = cloneDeep(this._fruits.filter(o => o.name.toLocaleLowerCase() === "banana"));

        return [200, fruits];
      });
    
    this._mockApiService
      .onGet("https://www.fruityvice.com/api/fruit/apple", 3000)
      .reply(({ request }) => {
        // Clone the mails mock-api to prevent accidental mock-api updates
        const fruits = cloneDeep(
          this._fruits.filter((o) => o.name.toLocaleLowerCase() === "apple")
        );

        return [200, fruits];
      });
  }
}
