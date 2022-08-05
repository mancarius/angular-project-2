import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  createClient,
  PaginationParams,
  Photo,
  ErrorResponse,
  PhotosWithTotalResults,
} from "pexels";
import { catchError, mergeMap, Observable, of, take } from "rxjs";
import { environment } from "src/environments/environment";

const pexelsApiKey = environment.pexelsApiKey;
//const pexels = createClient(pexelsApiKey);

@Injectable({
  providedIn: "root",
})
export class PexelsApiService {
  private _searchOptions: PaginationParams = {
    orientation: "landscape",
    size: "medium",
    color: "white",
    locale: "en-US",
    page: 1,
    per_page: 1,
  };

  constructor(private _http: HttpClient) {}

  getPhoto$(query: string, options: PaginationParams = {}): Observable<Photo | null> {
    // merge options
    const searchOptions = { ...this._searchOptions, ...options };

    return this._search({ query, ...searchOptions }).pipe(
      take(1),
      mergeMap((results) => {
        if ("error" in results) {
          throw new Error(results.error);
        }

        // get only first photo
        const photo = results.photos[0] || null;

        // return photo src
        return of(photo);
      }),
      catchError((err) => {
        console.warn(err);
        return of(null);
      })
    );
  }

  /**
   *
   * @param params
   * @returns
   */
  private _search(
    params: PaginationParams & { query: string }
  ): Observable<PhotosWithTotalResults | ErrorResponse> {
    return this._http.get<PhotosWithTotalResults>(
      "https://api.pexels.com/v1//search",
      {
        headers: {
          authorization: pexelsApiKey,
          "content-type": "application-json",
        },
        params,
      }
    );
  }
}
