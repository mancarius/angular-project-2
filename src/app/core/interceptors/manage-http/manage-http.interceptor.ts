import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, takeUntil } from 'rxjs';
import { ActivationStart, Router } from '@angular/router';
import { HttpAbortService } from '../../services/http-abort/http-abort.service';

@Injectable()
export class ManageHttpInterceptor implements HttpInterceptor {

  constructor(router: Router, private httpAbortService: HttpAbortService) {
    /*router.events.subscribe(event => {
      // An event triggered at the end of the activation part of the Resolve phase of routing.
      if (event instanceof ActivationStart) {
        // Cancel pending calls
        this.httpAbortService.abortPendingRequests();
      }
    })*/
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(takeUntil(this.httpAbortService.onAbortPendingRequests()))
  }
}
