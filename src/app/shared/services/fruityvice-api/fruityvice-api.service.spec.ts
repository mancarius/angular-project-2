import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";

import { FruityviceApiService } from "./fruityvice-api.service";
import { FruitNutritionTypes } from "@enum/fruit-nutrition-types.enum";
import { Search } from "../../../features/search/store/state/search.state";

describe("FruitSearchService", () => {
  let service: FruityviceApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FruityviceApiService],
    });
    service = TestBed.inject(FruityviceApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  /**
   * DESCRIBE
   *
   * FruityviceApiService.getById
   */
  describe("#getById", () => {
    it("should request fruit by id", () => {
      const fruitId = 6;
      const expectedUrl = `https://www.fruityvice.com/api/fruit/${fruitId}`;
      const expectedMethod = "GET";

      service.getById(fruitId).subscribe((result) => {});

      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe(expectedMethod);
      req.flush({});
    });
  });

  /**
   * DESCRIBE
   *
   * FruityviceApiService.find
   */
  describe("#find", () => {
    it("should call method #_getByName", () => {
      const filters: Pick<Search.filters, "name"> = {
        name: "banana",
      };
      spyOn<any>(service, "_getByName").and.stub();

      service.find({ filters, skip: 0, limit: 10 }).subscribe((_) => {});

      expect(service["_getByName"]).toHaveBeenCalledOnceWith(filters.name);
    });

    it("should call method #_getByNutrition", () => {
      const filters: Pick<Search.filters, "nutrition"> = {
        nutrition: {
          type: FruitNutritionTypes.calories,
          min: 50,
          max: 500,
        },
      };
      spyOn<any>(service, "_getByNutrition").and.stub();

      service.find({ filters, skip: 0, limit: 10 }).subscribe((_) => {});

      expect(service["_getByNutrition"]).toHaveBeenCalledOnceWith(
        filters.nutrition
      );
    });

    it("should call method #_getByGenus", () => {
      const filters: Pick<Search.filters, "genus"> = {
        genus: "Musa",
      };
      spyOn<any>(service, "_getByGenus").and.stub();

      service.find({ filters, skip: 0, limit: 10 }).subscribe((_) => {});

      expect(service["_getByFamily"]).toHaveBeenCalledOnceWith(filters.genus);
    });

    it("should call method #_getByFamily", () => {
      const filters: Pick<Search.filters, "family"> = {
        family: "Musaceae",
      };
      spyOn<any>(service, "_getByFamily").and.stub();

      service.find({ filters, skip: 0, limit: 10 }).subscribe((_) => {});

      expect(service["_getByFamily"]).toHaveBeenCalledOnceWith(filters.family);
    });

    it("should cal method #_getByOrder", () => {
      const filters: Pick<Search.filters, "order"> = {
        order: "Zingiberales",
      };
      spyOn<any>(service, "_getByOrder").and.stub();

      service.find({ filters, skip: 0, limit: 10 }).subscribe((_) => {});

      expect(service["_getByOrder"]).toHaveBeenCalledOnceWith(filters.order);
    });

    it("should call method #_getAll", () => {
      const filters: Search.filters = {};
      spyOn<any>(service, "_getAll").and.stub();

      service.find({ filters, skip: 0, limit: 10 }).subscribe((_) => {});

      expect(service["_getAll"]).toHaveBeenCalled();
    });

    it("should return 2 items starting from 3th item", (done) => {
      const filters = {};
      const skip = 2;
      const limit = 2;
      const expectedUrl = "https://www.fruityvice.com/api/fruit/all";
      const expectedMethod = "GET";

      service.find({ filters, skip, limit }).subscribe((_response) => {
        const { items, count } = _response;
        expect(items.length).toBe(limit);
        expect(items[0].id).toBe(3);
        expect(count).toBe(5);
        done();
      });

      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe(expectedMethod);
      req.flush([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]);
    });
  });

  /**
   * DESCRIBE
   *
   * FruityviceApiService._getByName
   */
  describe("#_getByName", () => {
    it("should request fruits by name", () => {
      const fruitName = "banana";
      const expectedUrl = `https://www.fruityvice.com/api/fruit/${fruitName}`;
      const expectedMethod = "GET";

      service["_getByName"](fruitName).subscribe((_) => {});

      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe(expectedMethod);
      req.flush([]);
    });
  });

  /**
   * DESCRIBE
   *
   * FruityviceApiService._getByNutrition
   */
  describe("#_getByNutrition", () => {
    it("should call nutrition api endpoint", () => {
      const nutrition: Search.filters["nutrition"] = {
        type: FruitNutritionTypes.calories,
        min: 50,
        max: 500,
      };

      const expectedUrl =
        "https://www.fruityvice.com/api/fruit/" +
        FruitNutritionTypes.calories +
        "?min=" +
        nutrition.min +
        "&max=" +
        nutrition.max;

      const expectedMethod = "GET";

      service["_getByNutrition"](nutrition).subscribe((_) => {});

      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe(expectedMethod);
      req.flush([]);
    });
  });

  /**
   * DESCRIBE
   *
   * FruityviceApiService._getByGenus
   */
  describe("#_getByGenus", () => {
    it("should request fruits by genus", () => {
      const genus: Search.filters["genus"] = "Musa";
      const expectedUrl = `https://www.fruityvice.com/api/fruit/genus/${genus}`;
      const expectedMethod = "GET";

      service["_getByGenus"](genus).subscribe((_) => {});

      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe(expectedMethod);
      req.flush([]);
    });
  });

  /**
   * DESCRIBE
   *
   * FruityviceApiService._getByFamily
   */
  describe("#_getByFamily", () => {
    it("should request fruits by family", () => {
      const family: Search.filters["family"] = "Musaceae";
      const expectedUrl = `https://www.fruityvice.com/api/fruit/family/${family}`;
      const expectedMethod = "GET";

      service["_getByFamily"](family).subscribe((_) => {});

      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe(expectedMethod);
      req.flush([]);
    });
  });

  /**
   * DESCRIBE
   *
   * FruityviceApiService._getByOrder
   */
  describe("#_getByOrder", () => {
    it("should request fruits by order", () => {
      const order: Search.filters["order"] = "Zingiberales";
      const expectedUrl = `https://www.fruityvice.com/api/fruit/order/${order}`;
      const expectedMethod = "GET";

      service["_getByOrder"](order).subscribe((_) => {});

      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe(expectedMethod);
      req.flush([]);
    });
  });

  /**
   * DESCRIBE
   *
   * FruityviceApiService._getAll
   */
  describe("#_getAll", () => {
    it("should request all fruits", () => {
      const expectedUrl = "https://www.fruityvice.com/api/fruit/all";
      const expectedMethod = "GET";

      service["_getAll"]().subscribe((_) => {});

      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe(expectedMethod);
      req.flush([]);
    });
  });
});
