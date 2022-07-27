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
      service.find({ filters: {} }).subscribe((result) => {
        
      });
      
      const req = httpMock.expectOne("https://localhost:44305/todolist");
      expect(req.request.method).toBe("GET");
    })
  });
});
