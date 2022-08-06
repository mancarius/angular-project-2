import { HttpParams } from "@angular/common/http";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import * as _ from "lodash";
import { PhotosWithTotalResults } from "pexels";

import { PexelsApiService } from "./pexels-api.service";

const MOCK_API_RESPONSE: PhotosWithTotalResults = {
  total_results: 10000,
  page: 1,
  per_page: 1,
  photos: [
    {
      id: 3573351,
      width: 3066,
      height: 3968,
      url: "https://www.pexels.com/photo/trees-during-day-3573351/",
      photographer: "Lukas Rodriguez",
      photographer_url: "https://www.pexels.com/@lukas-rodriguez-1845331",
      photographer_id: "1845331",
      src: {
        original:
          "https://images.pexels.com/photos/3573351/pexels-photo-3573351.png",
        large2x:
          "https://images.pexels.com/photos/3573351/pexels-photo-3573351.png?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        large:
          "https://images.pexels.com/photos/3573351/pexels-photo-3573351.png?auto=compress&cs=tinysrgb&h=650&w=940",
        medium:
          "https://images.pexels.com/photos/3573351/pexels-photo-3573351.png?auto=compress&cs=tinysrgb&h=350",
        small:
          "https://images.pexels.com/photos/3573351/pexels-photo-3573351.png?auto=compress&cs=tinysrgb&h=130",
        portrait:
          "https://images.pexels.com/photos/3573351/pexels-photo-3573351.png?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
        landscape:
          "https://images.pexels.com/photos/3573351/pexels-photo-3573351.png?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
        tiny: "https://images.pexels.com/photos/3573351/pexels-photo-3573351.png?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280",
      },
      liked: false,
    },
  ],
  next_page: 2,
};

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
            MOCK_API_RESPONSE,
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

      req.flush(MOCK_API_RESPONSE);
    });
  });
});
