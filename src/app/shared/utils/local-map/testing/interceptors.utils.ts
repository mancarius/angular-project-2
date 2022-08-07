import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { Observable } from "rxjs";

/**
 * Return a mock http event to pass as second param to method intercept
 * @param response If omitted, the observable complete without emitting any value
 * @returns
 *
 * @usageNotes
 * ```ts
 * const interceptor = TestBed.inject(MyInterceptor);
 * const mockHttpRequest = new HttpRequest("GET", "fake/url");
 * const mockHttpResponse = new HttpResponse();
 * const next = createInterceptorNextParam(mockHttpResponse);
 *
 * interceptor.intercept(mockHttpRequest, next).subscribe({...});
 * ```
 */
export function createInterceptorNextParam<Req = any, Res = any>(
  response?: HttpResponse<Res>
): HttpHandler {
  return ({
    handle: (request: HttpRequest<Req>): Observable<HttpEvent<Res>> => {
      return new Observable((subscriber) => {
        response && subscriber.next(response);
        subscriber.complete();
      });
    },
  });
};
