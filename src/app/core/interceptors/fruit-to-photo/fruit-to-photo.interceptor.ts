import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from "@angular/common/http";
import { combineLatest, map, Observable, of, switchMap, take } from "rxjs";
import { PexelsApiService } from "../../services/pexels-api/pexels-api.service";
import { Fruit } from "@type/fruit";

@Injectable()
export class FruitToPhotoInterceptor implements HttpInterceptor {
  constructor(private pexels: PexelsApiService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      switchMap((event) => {
        if (event instanceof HttpResponse && event.status === 200) {
          const url = new URL(event.url);
          if (url.hostname.match(/fruityvice/) && request.method === "GET") {
            const fruits = event.body as Fruit[];
            if (Array.isArray(fruits)) {
              // create requests for each fruit
              const photoRequests = fruits.map((fruit) =>
                this.pexels.getPhoto$(fruit.name).pipe(
                  take(1),
                  map((photo) => ({
                    ...fruit,
                    photo,
                  }))
                )
              );

              // return request as observables
              return combineLatest(photoRequests).pipe(
                switchMap((results) => of(event.clone({ body: results })))
              );
            }
          }
        }

        return of(event);
      })
    );
  }
}
