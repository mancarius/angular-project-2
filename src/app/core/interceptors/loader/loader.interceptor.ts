import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { finalize, Observable, tap } from "rxjs";
import { HttpLoaderService } from "../../services/http-loader/http-loader.service";

@Injectable({
  providedIn: "root",
})
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private _loader: HttpLoaderService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // show loader
    this._loader.show();

    return next.handle(request).pipe(
      finalize(() => this._loader.hide())
    );
  }
}
