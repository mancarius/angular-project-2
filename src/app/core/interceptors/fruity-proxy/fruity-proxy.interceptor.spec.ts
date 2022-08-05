import { HttpClient, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { firstValueFrom, lastValueFrom, Observable } from "rxjs";

import { FruityProxyInterceptor } from "./fruity-proxy.interceptor";

describe("FruityProxyInterceptor", () => {
  let interceptor: FruityProxyInterceptor;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FruityProxyInterceptor],
      imports: [
        HttpClientTestingModule
      ]
    })

    interceptor = TestBed.inject(FruityProxyInterceptor);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should be created", () => {
    expect(interceptor).toBeTruthy();
  });

  describe('#_proxy', () => {
    it("should update request url", () => {
      const requestedUrl = "https://www.fruityvice.com/api/fruit/banana";
      const expectedUrl =
        "https://fruityvice.free.beeceptor.com/api/fruit/banana";

      const requestMock = new HttpRequest("GET", requestedUrl);

      const updatedRequest = interceptor['_proxy'](requestMock);

      expect(updatedRequest.url).toBe(expectedUrl);
    });
  })
});