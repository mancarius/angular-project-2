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
import { Fruit, FruitWithPhoto } from "@type/fruit";

@Injectable()
export class FruitToPhotoInterceptor implements HttpInterceptor {
  constructor(private _photoSrv: PexelsApiService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      switchMap((event) => {
        // if it's a succesfull response...
        if (event instanceof HttpResponse && event.status === 200) {
          const url = new URL(request.url);

          // if was a GET request to fruityvice api...
          if (url.hostname.match(/fruityvice/) && request.method === "GET") {
            // take body response
            const fruits = [event.body as Fruit | Fruit[]].flat() as Fruit[];

            // if response is a non empty array...
            if (Array.isArray(fruits) && fruits.length) {
              // create a request for each fruit and merge response
              const fruitsWithPhoto = fruits.map<Observable<FruitWithPhoto>>(
                this._getFruitWithPhoto$.bind(this)
              );

              // return combined responses
              return combineLatest<FruitWithPhoto[]>(fruitsWithPhoto).pipe(
                switchMap((results) => of(event.clone({ body: results })))
              );
            }
          }
        }

        // else return the original event
        return of(event);
      })
    );
  }

  /**
   * Require a photo for the given fruit.
   * @param fruit
   * @returns An observable that emits the given fruit with photo
   */
  private _getFruitWithPhoto$(fruit: Fruit): Observable<FruitWithPhoto> {
    return this._photoSrv.getPhoto$(fruit.name).pipe(
      take(1),
      map((photo) => ({
        ...fruit,
        photo,
      }))
    );
  }
}
