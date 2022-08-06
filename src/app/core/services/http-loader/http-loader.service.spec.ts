import { TestBed } from "@angular/core/testing";
import { provideMockStore } from "@ngrx/store/testing";

import { HttpLoaderService } from "./http-loader.service";

describe("HttpLoaderService", () => {
  let service: HttpLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({})],
    });

    service = TestBed.inject(HttpLoaderService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
