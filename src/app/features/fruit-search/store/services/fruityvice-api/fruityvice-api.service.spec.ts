import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { FruityviceApiService } from './fruityvice-api.service';
import { Search } from 'src/app/features/fruit-search/store/state';
import { FruitNutritionTypes } from '@enum/fruit-nutrition-types.enum';

describe('FruitSearchService', () => {
  let service: FruityviceApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FruityviceApiService]
    });
    service = TestBed.inject(FruityviceApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe("#find", () => {

    it('should request fruits by name', () => {
      const expectedUrl = "https://www.fruityvice.com/api/fruit/banana"
      const expectedMethod = "GET";
      const filters = {
        name: "banana"
      }

      service.find({ filters }).subscribe((result) => { });

      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe(expectedMethod);
      req.flush('');
    });

    it('should request fruits by nutrition', () => {
      const filters: Search.filters = {
        nutrition: {
          type: FruitNutritionTypes.calories,
          min: 50,
          max: 500
        }
      }
      const expectedUrl = "https://www.fruityvice.com/api/fruit/" + FruitNutritionTypes.calories + "?min=" + filters.nutrition.min + "&max=" + filters.nutrition.max;
      const expectedMethod = "GET";

      service.find({ filters }).subscribe((result) => { });

      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe(expectedMethod);
      req.flush('');
    });

    it('should request fruits by genus', () => {
      const filters: Search.filters = {
        genus: "Musa"
      };
      const expectedUrl = "https://www.fruityvice.com/api/fruit/genus/Musa";
      const expectedMethod = "GET";

      service.find({ filters }).subscribe((result) => { });

      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe(expectedMethod);
      req.flush('');
    });

    it('should request fruits by family', () => {
      const filters: Search.filters = {
        family: "Musaceae"
      };
      const expectedUrl = "https://www.fruityvice.com/api/fruit/family/Musaceae";
      const expectedMethod = "GET";

      service.find({ filters }).subscribe((result) => { });

      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe(expectedMethod);
      req.flush('');
    });

    it('should request fruits by order', () => {
      const filters: Search.filters = {
        order: "Zingiberales"
      };
      const expectedUrl = "https://www.fruityvice.com/api/fruit/order/Zingiberales";
      const expectedMethod = "GET";

      service.find({ filters }).subscribe((result) => { });

      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe(expectedMethod);
      req.flush('');
    });

    it('should request all fruits', () => {
      const filters: Search.filters = {};
      const expectedUrl = "https://www.fruityvice.com/api/fruit/all";
      const expectedMethod = "GET";

      service.find({ filters }).subscribe((result) => { });

      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe(expectedMethod);
      req.flush('');
    });

    it('should return 2 items starting from 3th item', () => {
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
      });

      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe(expectedMethod);
      req.flush([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]);
    });
  });
});
