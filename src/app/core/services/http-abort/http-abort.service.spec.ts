import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { HttpAbortService } from './http-abort.service';

describe('HttpAbortService', () => {
  let service: HttpAbortService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpAbortService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#onAbortPendingRequests should emit a signal on #abortPendingRequests execution', fakeAsync(() => {
    let abortSignalEmitted = false;

    service.onAbortPendingRequests().subscribe({
      next: () => {
        abortSignalEmitted = true;
      }
    });

    service.abortPendingRequests();

    tick(100);

    expect(abortSignalEmitted).toBeTruthy();
  }))
});
