import { TestBed } from '@angular/core/testing';

import { FruityviceMockApiInterceptor } from './fruityvice-mock-api.interceptor';

describe('FruityviceMockApiInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      FruityviceMockApiInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: FruityviceMockApiInterceptor = TestBed.inject(FruityviceMockApiInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
