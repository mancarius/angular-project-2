import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { FruitToPhotoInterceptor } from './fruit-to-photo.interceptor';

describe('FruitToPhotoInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [
      FruitToPhotoInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: FruitToPhotoInterceptor = TestBed.inject(FruitToPhotoInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
