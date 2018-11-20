import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import {Cupcake, Garniture, Glacage, Base, Topping} from '../interfaces/cupcake';
import { defaultIfEmpty, filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CupcakesService {
  // private property to store all backend URLs
  private readonly _backendURL: any;
  // private property to store default cupcake
  private readonly _defaultCupcake: Cupcake;

  constructor(private _http: HttpClient) {
    this._defaultCupcake = {
        nom: 'Cupcake',
      composition: {
        base: {
          label: '',
          src: ''
        },
        glacage: {
          label: '',
          src: ''
        },
        topping: {
          label: '',
          src: ''
        },
        garniture: {
          label: '',
          src: ''
        }
      },
      createur: ''
    };
    this._backendURL = {};

    // build backend base url
    let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
    if (environment.backend.port) {
      baseUrl += `:${environment.backend.port}`;
    }

    // build all backend urls
    Object.keys(environment.backend.endpoints).forEach(k => this._backendURL[ k ] = `${baseUrl}${environment.backend.endpoints[ k ]}`);
  }

  /**
   * Returns the default cupcake value
   */
  get defaultCupcake(): Cupcake {
    return this._defaultCupcake;
  }

  /**
   * Function to return list of cupcakes
   */
  fetch(): Observable<Cupcake[]> {
    return this._http.get<Cupcake[]>(this._backendURL.allCupcakes)
      .pipe(
        filter(_ => !!_),
        defaultIfEmpty([])
      );
  }

  /**
   * Function to return list of bases
   */
  fetchBases(): Observable<Base[]> {
    return this._http.get<Base[]>(this._backendURL.allBases)
      .pipe(
        filter(_ => !!_),
        defaultIfEmpty([])
      );
  }

  /**
   * Function to return list of glacages
   */
  fetchGlacages(): Observable<Glacage[]> {
    return this._http.get<Glacage[]>(this._backendURL.allGlacages)
      .pipe(
        filter(_ => !!_),
        defaultIfEmpty([])
      );
  }

  /**
   * Function to return list of toppings
   */
  fetchToppings(): Observable<Topping[]> {
    return this._http.get<Topping[]>(this._backendURL.allToppings)
      .pipe(
        filter(_ => !!_),
        defaultIfEmpty([])
      );
  }

  /**
   * Function to return list of garnitures
   */
  fetchGarnitures(): Observable<Garniture[]> {
    return this._http.get<Garniture[]>(this._backendURL.allGarnitures)
      .pipe(
        filter(_ => !!_),
        defaultIfEmpty([])
      );
  }




  /**
   * Function to return one random cupcake from cupcakes list
   */
  fetchRandom(): Observable<Cupcake> {
    return this._http.get<Cupcake>(this._backendURL.randomCupcakes)
      .pipe(
        filter(_ => !!_),
        defaultIfEmpty(this._defaultCupcake)
      );
  }

  /**
   * Function to return one cupcake for current id
   */
  fetchOne(id: string): Observable<Cupcake> {
    return this._http.get<Cupcake>(this._backendURL.oneCupcakes.replace(':id', id));
  }

  /**
   * Function to create a new cupcake
   */
  create(cupcake: Cupcake): Observable<any> {
    return this._http.post<Cupcake>(this._backendURL.allCupcakes, cupcake, this._options());
  }

  /**
   * Function to update one cupcake
   */
  update(cupcake: Cupcake): Observable<any> {
    return this._http.put<Cupcake>(this._backendURL.oneCupcakes.replace(':id', cupcake.id), cupcake, this._options());
  }

  /**
   * Function to delete one cupcake for current id
   */
  delete(id: string): Observable<string> {
    return this._http.delete(this._backendURL.oneCupcakes.replace(':id', id))
      .pipe(
        map(_ => id)
      );
  }

  /**
   * Function to return request options
   */
  private _options(headerList: Object = {}): any {
    return { headers: new HttpHeaders(Object.assign({ 'Content-Type': 'application/json' }, headerList)) };
  }
}
