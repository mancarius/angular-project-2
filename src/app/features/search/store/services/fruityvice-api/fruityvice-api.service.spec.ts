import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { FruityviceApiService } from './fruityvice-api.service';

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

    it('should call httpClient', () => {
      const expectedUrl = "https://www.fruityvice.com/api/fruit/banana"
      const expectedMethod = "GET";
      const filters = {
        name: "banana"
      }

      service.find({ filters }).subscribe((result) => {
        
      });
      
      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe(expectedMethod);
    })
  });
});
