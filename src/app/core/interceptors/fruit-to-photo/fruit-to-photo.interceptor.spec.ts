import {
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { Observable } from "rxjs";
import { FRUITYVICE_MOCK_FRUITS } from "src/app/shared/mocks/fruityvice-mocks";
import { PEXELS_MOCK_PHOTO } from "src/app/shared/mocks/pexels-mocks";
import { createInterceptorNextParam } from "src/app/shared/utils/local-map/testing/interceptors.utils";
import { PexelsApiService } from "../../services/pexels-api/pexels-api.service";
import { FruitToPhotoInterceptor } from "./fruit-to-photo.interceptor";

describe("FruitToPhotoInterceptor", () => {
  let interceptor: FruitToPhotoInterceptor;
  let PexelsApiServiceSpy: jasmine.SpyObj<PexelsApiService>;
  const next = createInterceptorNextParam;

  beforeEach(() => {
    PexelsApiServiceSpy = jasmine.createSpyObj("PexelsApiService", [
      "getPhoto$",
    ]);
    PexelsApiServiceSpy.getPhoto$.and.stub();

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        FruitToPhotoInterceptor,
        { provide: PexelsApiService, useValue: PexelsApiServiceSpy },
      ],
    });

    interceptor = TestBed.inject(FruitToPhotoInterceptor);
  });

  it("should be created", () => {
    expect(interceptor).toBeTruthy();
  });

  /**
   * METHOD: interceptor
   */
  describe("#interceptor", () => {
    beforeEach(() => {
      PexelsApiServiceSpy.getPhoto$.and.returnValue(
        new Observable((subscriber) => {
          subscriber.next(PEXELS_MOCK_PHOTO);
          subscriber.complete();
        })
      );
    });

    it("should return combined response with photos", (done) => {
      const mockFruits = FRUITYVICE_MOCK_FRUITS.slice(-3);
      const fakeURL = "https://www.fruityvice.com";
      const mockHttpRequest = new HttpRequest("GET", fakeURL);
      const mockHttpResponse = new HttpResponse({ body: mockFruits });

      interceptor.intercept(mockHttpRequest, next(mockHttpResponse)).subscribe({
        next(event) {
          if (event instanceof HttpResponse) {
            expect(event.body.length).toBe(3, "should return 3 items");
            event.body.forEach((fruit) => expect("photo" in fruit).toBeTrue());
          }
        },
        error(err) {
          fail(err);
        },
        complete() {
          done();
        },
      });
    });

    it("should not call #_getFruitWithPhoto$ when hostname not match 'fruityvice'", (done) => {
      const mockFruits = FRUITYVICE_MOCK_FRUITS[0];
      const fakeURL = "https://www.fruitvice.com";
      const mockHttpRequest = new HttpRequest("GET", fakeURL);
      const mockHttpResponse = new HttpResponse({ body: mockFruits });

      interceptor.intercept(mockHttpRequest, next(mockHttpResponse)).subscribe({
        next(event) {
          if (event instanceof HttpResponse) {
            expect(event.body).toEqual(
              mockHttpResponse.body,
              "response body sould not be mutated"
            );
          }
        },
        error(err) {
          fail(err);
        },
        complete() {
          expect(PexelsApiServiceSpy.getPhoto$).not.toHaveBeenCalled();
          done();
        },
      });
    });

    it("should not call #_getFruitWithPhoto$ when method is different from 'GET'", (done) => {
      const mockFruits = FRUITYVICE_MOCK_FRUITS[0];
      const fakeURL = "https://www.fruityvice.com";
      const mockHttpRequest = new HttpRequest("DELETE", fakeURL);
      const mockHttpResponse = new HttpResponse({ body: mockFruits });

      interceptor.intercept(mockHttpRequest, next(mockHttpResponse)).subscribe({
        next(event) {
          if (event instanceof HttpResponse) {
            expect(event.body).toEqual(mockHttpResponse.body);
          }
        },
        error(err) {
          fail(err);
        },
        complete() {
          expect(PexelsApiServiceSpy.getPhoto$).not.toHaveBeenCalled();
          done();
        },
      });
    });
  });

  /**
   * METHOD: _getFruitWithPhoto$
   */
  describe("#_getFruitWithPhoto$", () => {
    const mockFruit = FRUITYVICE_MOCK_FRUITS[0];

    it("should return fruit with photo", (done) => {
      let emitsCount = 0;

      // emits 2 values
      PexelsApiServiceSpy.getPhoto$.and.returnValue(
        new Observable((subscriber) => {
          subscriber.next(PEXELS_MOCK_PHOTO);
          subscriber.next(null);

          subscriber.complete();
        })
      );

      interceptor["_getFruitWithPhoto$"](mockFruit).subscribe({
        next(fruit) {
          expect("photo" in fruit).toBeTrue();
          expect("name" in fruit).toBeTrue();
          emitsCount++;
        },
        error(err) {
          fail(err);
        },
        complete() {
          expect(emitsCount).toBe(
            1,
            "should take only the first emitted value"
          );
          done();
        },
      });
    });
  });
});
