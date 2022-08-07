import { HttpParams } from "@angular/common/http";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import * as _ from "lodash";

import { PexelsApiService } from "./pexels-api.service";
import { PEXELS_MOCK_API_RESPONSE } from "../../../shared/mocks/pexels-mocks";



describe("PexelsApiService", () => {
  let service: PexelsApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(PexelsApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  /**
   * METHOD: _search
   */
  describe("#_search", () => {
    it("should call pexels api with given params", () => {
      const expectedUrl = "https://api.pexels.com/v1//search";

      const expectedQueryParams = new HttpParams({
        fromObject: { query: "Apple", color: "red", per_page: 2 },
      });

      service["_search"]({
        query: "Apple",
        color: "red",
        per_page: 2,
      }).subscribe({
        next(value) {
          expect(value).toEqual(
            PEXELS_MOCK_API_RESPONSE,
            "should return the expected value"
          );
        },
        error(err) {
          fail(err);
        },
      });

      const req = httpMock.expectOne((req) => {
        return (
          req.url === expectedUrl &&
          req.params.toString() === expectedQueryParams.toString()
        );
      });

      expect(req.request.method).toBe("GET", "should perform a GET request");

      req.flush(PEXELS_MOCK_API_RESPONSE);
    });
  });
});
