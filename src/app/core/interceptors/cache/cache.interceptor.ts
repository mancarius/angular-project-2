import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from "@angular/common/http";
import { Observable, of, tap, delay } from "rxjs";
import { LocalMap } from "src/app/shared/utils/local-map.utils";

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  private _cache = new LocalMap<string, HttpResponse<any>>();

  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // if not a GET request, then jump caching
    if (request.method !== "GET") {
      return next.handle(request);
    }

    // get complete url
    const url = request.urlWithParams;

    // find url in cache
    const cachedResponse = this._cache.get(url);

    // return cached response if exists
    if (cachedResponse) {
      return of(new HttpResponse(cachedResponse)).pipe(delay(500));
    }

    // store and return response
    return next.handle(request).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          this._cache.set(url, event);
        }
      })
    );
  }
}
