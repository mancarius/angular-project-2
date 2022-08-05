import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable, map } from "rxjs";

@Injectable()
export class FruityProxyInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(this._proxy(request));
  }

  /**
   *
   * @param request
   * @returns
   */
  _proxy(request: HttpRequest<unknown>): HttpRequest<unknown> {
    const url = new URL(request.url);
    let update: Record<string, any>;

    switch (url.host) {
      case "www.fruityvice.com":
        update = { url: `https://fruityvice.free.beeceptor.com${url.pathname}` };
        break;
      default:
        update = {};
    }

    return request.clone(update);
  }
}
