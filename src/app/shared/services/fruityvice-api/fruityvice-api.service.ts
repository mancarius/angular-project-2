import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FruitAttributes } from "@enum/fruit-attributes.enum";
import { Fruit } from "@type/fruit";
import { ValueOf } from "@type/value-of";
import { map, Observable } from "rxjs";
import * as fromSearch from "../../../features/search/store";

@Injectable({
  providedIn: "root",
})
export class FruityviceApiService {
  private _baseUrl = "https://www.fruityvice.com/api/fruit";

  constructor(protected _http: HttpClient) {}

  /**
   * Get fruit by id
   *
   * @param fruitId
   * @returns {Observable<Fruit>}
   */
  getById(fruitId: number): Observable<Fruit> {
    const url = `${this._baseUrl}/${fruitId}`;
    return this._http.get<Fruit>(url);
  }

  /**
   * Find fruits using the given filters. Returns results depending on pagination
   *
   * @param {Search.requestProps} params
   * @returns {Observable<Fruit[]>}
   */
  find({
    filters,
    skip = 0,
    limit = 20,
  }: {
    filters: fromSearch.coreTypes.filters;
    skip: number;
    limit: number;
  }): Observable<fromSearch.coreTypes.results> {
    let result$: Observable<Fruit[]>;
    const functionNamePrefix = "_get";
    let functionNameSuffix: string = "All";
    let functionProps: ValueOf<fromSearch.coreTypes.filters> | undefined;

    try {
      if (typeof filters === "object") {
        // get attribute and data from filters
        const [attribute, data] =
          (
            Object.entries(filters) as [
              keyof fromSearch.coreTypes.filters,
              ValueOf<fromSearch.coreTypes.filters>
            ][]
          )[0] || [];

        // compose the function name for this attribute
        functionNameSuffix = (() => {
          const attributeName: string | undefined = FruitAttributes[attribute];

          if (attributeName) {
            return `By${attributeName
              .charAt(0)
              .toLocaleUpperCase()}${attributeName.substring(1)}`;
          } else {
            return "All";
          }
        })();

        functionProps = data;
      }

      const functionName = functionNamePrefix + functionNameSuffix;

      // if method exists, then call it
      if (typeof Reflect.get(this, functionName) === "function") {
        result$ = Reflect.get(this, functionName).call(this, functionProps);
      } else {
        throw new TypeError(`${functionName} is not a function`);
      }
    } catch (err) {
      throw err;
    }

    // returns paginated results
    return result$.pipe(
      map((items) => ({
        items: items.slice(skip, skip + limit),
        count: items.length,
      }))
    );
  }

  /**
   * Require all fruits
   *
   * @returns {Observable<Fruit[]>}
   */
  private _getAll(): Observable<Fruit[]> {
    const url = this._baseUrl + "/all";
    return this._http.get<Fruit[]>(url);
  }

  /**
   * Require fruits filtered by nutrition values
   *
   * @param {Search.nutritionProps} data
   * @returns {Observable<Fruit[]>}
   */
  private _getByNutrition({
    type,
    min = 0,
    max = 1000,
  }: fromSearch.coreTypes.nutritionProps): Observable<Fruit[]> {
    const url = this._baseUrl + "/" + type;
    const otions: Record<string, any> = {
      params: { min, max },
    };

    return this._http.get<Fruit[]>(url, otions);
  }

  /**
   * Request fruits with given name
   *
   * @param _fruitName
   * @returns
   */
  private _getByName(_fruitName: string): Observable<Fruit[]> {
    const url = this._baseUrl + "/" + _fruitName;

    return this._http.get<Fruit[]>(url);
  }

  /**
   * Request fruits with given family
   *
   * @param {string} _familyName
   * @returns {Observable<Fruit[]>}
   */
  private _getByFamily(_familyName: string): Observable<Fruit[]> {
    const url = this._baseUrl + "/family/" + _familyName;

    return this._http.get<Fruit[]>(url);
  }

  /**
   * Request fruits with given order
   *
   * @param {string} orderName
   * @returns {Observable<Fruit[]>}
   */
  private _getByOrder(_orderName: string): Observable<Fruit[]> {
    const url = this._baseUrl + "/order/" + _orderName;

    return this._http.get<Fruit[]>(url);
  }

  /**
   * Request fruits with given genus
   *
   * @param {string} _genusName
   * @returns {Observable<Fruit[]>}
   */
  private _getByGenus(_genusName: string): Observable<Fruit[]> {
    const url = this._baseUrl + "/genus/" + _genusName;

    return this._http.get<Fruit[]>(url);
  }
}
