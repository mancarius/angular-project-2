import { HttpRequest, HttpResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { LocalMap } from "src/app/shared/utils/local-map/local-map.utils";
import { createInterceptorNextParam } from "src/app/shared/utils/local-map/testing/interceptors.utils";

import { CacheInterceptor } from "./cache.interceptor";

describe("CacheInterceptor", () => {
  let LocalMapSpy: jasmine.SpyObj<LocalMap>;
  let interceptor: CacheInterceptor;
  const next = createInterceptorNextParam;
  const fakeURL = "/fake/path";

  beforeEach(() => {
    LocalMapSpy = jasmine.createSpyObj("LocalMap", ["get", "set", "removeOne"]);
    LocalMapSpy.set.and.stub();

    TestBed.configureTestingModule({
      providers: [CacheInterceptor],
    });

    interceptor = TestBed.inject(CacheInterceptor);
    interceptor["_cache"] = LocalMapSpy;
  });

  it("should be created", () => {
    const interceptor: CacheInterceptor = TestBed.inject(CacheInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it("should jump caching when request method is not GET", (done) => {
    const requestMock = new HttpRequest("DELETE", fakeURL);
    LocalMapSpy.get.and.stub();

    interceptor.intercept(requestMock, next()).subscribe({
      complete() {
        expect(LocalMapSpy.get).toHaveBeenCalledTimes(0);
        expect(LocalMapSpy.set).toHaveBeenCalledTimes(0);
        done();
      },
    });
  });

  it("should looks for cache, then should returns the cached response", (done) => {
    const requestMock = new HttpRequest("GET", fakeURL);
    const wrongResponse = new HttpResponse({ status: 400, body: "fail" });
    const cachedResponse = new HttpResponse({ status: 200, body: "success" });

    LocalMapSpy.get.and.returnValue(cachedResponse);

    interceptor.intercept(requestMock, next(wrongResponse)).subscribe({
      next(event) {
        if (event instanceof HttpResponse) {
          expect(event.body).toBe("success", "should return 'success'");
        }
      },
      complete() {
        expect(LocalMapSpy.get).toHaveBeenCalledOnceWith(fakeURL);
        expect(LocalMapSpy.set).toHaveBeenCalledTimes(0);
        done();
      },
    });
  });

  it("should caching new success responses", (done) => {
    const requestMock = new HttpRequest("GET", fakeURL);
    const response = new HttpResponse({ status: 200, body: "success" });

    LocalMapSpy.get.and.returnValue(null);

    interceptor.intercept(requestMock, next(response)).subscribe({
      complete() {
        expect(LocalMapSpy.get).toHaveBeenCalledOnceWith(fakeURL);
        expect(LocalMapSpy.set).toHaveBeenCalledOnceWith(fakeURL, response);
        done();
      },
    });
  });

  it("should not caching new failed responses", (done) => {
    const requestMock = new HttpRequest("GET", fakeURL);
    const response = new HttpResponse({ status: 400, body: "failed" });

    LocalMapSpy.get.and.returnValue(null);

    interceptor.intercept(requestMock, next(response)).subscribe({
      complete() {
        expect(LocalMapSpy.get).toHaveBeenCalledOnceWith(fakeURL);
        expect(LocalMapSpy.set).not.toHaveBeenCalledOnceWith(fakeURL, response);
        done();
      },
    });
  });
});
