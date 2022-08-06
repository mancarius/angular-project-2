import { TestBed } from "@angular/core/testing";
import { HttpLoaderService } from "../../services/http-loader/http-loader.service";
import { LoaderInterceptor } from "./loader.interceptor";

describe("LoaderInterceptor", () => {
  let HttpLoaderServiceMock: jasmine.SpyObj<HttpLoaderService>;
  let interceptor: LoaderInterceptor;

  beforeEach(() => {
    HttpLoaderServiceMock = jasmine.createSpyObj("HttpLoaderServiceMock", [
      "show",
      "hide",
    ]);

    TestBed.configureTestingModule({
      providers: [
        LoaderInterceptor,
        { provide: HttpLoaderService, useValue: HttpLoaderServiceMock },
      ]
    });

    interceptor = TestBed.inject(LoaderInterceptor);
  });

  it("should be created", () => {
    expect(interceptor).toBeTruthy();
  });
});
