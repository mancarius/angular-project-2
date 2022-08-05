import { TestBed } from '@angular/core/testing';
import { MOCK_API_DEFAULT_DELAY } from '../../services/mock-api/mock-api.constants';

import { FruityviceMockApiInterceptor } from './fruityvice-mock-api.interceptor';

describe('FruityviceMockApiInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        FruityviceMockApiInterceptor,
        { provide: MOCK_API_DEFAULT_DELAY, useValue: MOCK_API_DEFAULT_DELAY },
      ],
    })
  );

  it('should be created', () => {
    const interceptor: FruityviceMockApiInterceptor = TestBed.inject(FruityviceMockApiInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
