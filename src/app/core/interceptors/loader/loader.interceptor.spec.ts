import { HttpRequest, HttpResponse } from "@angular/common/http";
import { TestBed, tick } from "@angular/core/testing";
import { createInterceptorNextParam } from "src/app/shared/utils/local-map/testing/interceptors.utils";
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
    HttpLoaderServiceMock.show.and.stub();
    HttpLoaderServiceMock.hide.and.stub();

    TestBed.configureTestingModule({
      providers: [
        LoaderInterceptor,
        { provide: HttpLoaderService, useValue: HttpLoaderServiceMock },
      ],
    });

    interceptor = TestBed.inject(LoaderInterceptor);
  });

  it("should be created", () => {
    expect(interceptor).toBeTruthy();
  });

  it("should call HttpLoaderService.show before HttpLoaderService.hide", (done) => {
    const mockHttpRequest = new HttpRequest("GET", "fake/url");
    const mockHttpResponse = new HttpResponse({ body: "" });
    const next = createInterceptorNextParam<string, string>(mockHttpResponse);

    interceptor.intercept(mockHttpRequest, next).subscribe({
      next(value) {
        expect(HttpLoaderServiceMock.show).toHaveBeenCalledTimes(1);
      },
      complete() {
        expect(HttpLoaderServiceMock.hide).toHaveBeenCalledTimes(1);
        expect(HttpLoaderServiceMock.show).toHaveBeenCalledBefore(
          HttpLoaderServiceMock.hide
        );
        done();
      },
    });
  });
});
