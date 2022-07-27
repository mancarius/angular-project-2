import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FruitAttributes } from '@enum/fruit-attributes.enum';
import { Fruit } from '@type/fruit';
import { ValueOf } from '@type/value-of';
import { map, Observable } from 'rxjs';
import { Search } from '../../state';


@Injectable({
  providedIn: 'root'
})
export class FruityviceApiService {
  private _baseUrl = "https://www.fruityvice.com/api/fruit";

  constructor(protected _http: HttpClient) { }

  /**
   * 
   * @param {Search.requestProps} params
   * @returns {Observable<Fruit[]>}
   */
  find({ filters, skip = 0, limit = 20 }: Search.requestProps): Observable<Fruit[]> {
    let result$: Observable<Fruit[]>;

    try {
      if (typeof filters === "object") {
        const [attribute, data] = (Object.entries(filters) as [keyof Search.filters, ValueOf<Search.filters>][])[0] || [];

        const functionName = '_getBy' + String(FruitAttributes[attribute]).toLocaleUpperCase();

        if (typeof this[functionName] === "function") {
          result$ = this[functionName](data);
        }
      }

      if (result$ === undefined) {
        result$ = this._getAll();
      }
    } catch (err) {
      throw err;
    }

    // returns paginated results
    return result$.pipe(map((items) => items.slice(skip, skip + limit)))
  }

  /**
   * Require all fruits
   * @returns {Observable<Fruit[]>}
   */
  private _getAll() {
    const url = this._baseUrl + '/all';
    return this._http.get<Fruit[]>(url);
  }

  /**
   * Require fruits filtered by nutrition values
   * @param {Search.nutritionProps} data 
   * @returns {Observable<Fruit[]>}
   */
  private _getByNutrition({ type, min = 0, max = 1000 }: Search.nutritionProps) {
    const url = this._baseUrl + '/' + type;
    const otions: Record<string, any> = {
      params: { min, max }
    };

    return this._http.get<Fruit[]>(url, otions);
  }

  /**
   * Request fruits with given name
   * @param _fruitName 
   * @returns 
   */
  private _getByName(_fruitName: string) {
    const url = this._baseUrl + '/' + _fruitName;

    return this._http.get<Fruit[]>(url);
  }

  /**
   * Request fruits with given family
   * @param {string} _familyName 
   * @returns {Observable<Fruit[]>}
   */
  private _getByFamily(_familyName: string) {
    const url = this._baseUrl + '/family/' + _familyName;

    return this._http.get<Fruit[]>(url);
  }

  /**
   * Request fruits with given order
   * @param {string} orderName
   * @returns {Observable<Fruit[]>}
   */
  private _getByOrder(_orderName: string) {
    const url = this._baseUrl + '/order/' + _orderName;

    return this._http.get<Fruit[]>(url);
  }

  /**
   * Request fruits with given genus
   * @param {string} _genusName
   * @returns {Observable<Fruit[]>}
   */
  private _getByGenus(_genusName: string) {
    const url = this._baseUrl + '/genus/' + _genusName;

    return this._http.get<Fruit[]>(url);
  }
}
