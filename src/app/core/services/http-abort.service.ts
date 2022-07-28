import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpAbortService {

  private pendingHTTPRequests$ = new Subject<void>();

  constructor() { }

  // Cancel Pending HTTP calls
  public abortPendingRequests() {
    this.pendingHTTPRequests$.next();
  }

  public onAbortPendingRequests() {
    return this.pendingHTTPRequests$.asObservable();
  }
}