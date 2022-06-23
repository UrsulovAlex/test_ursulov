import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpeciesService {
  private _baseUrl = 'https://swapi.dev/api/species/';

  constructor(private _http: HttpClient) { }

  getSpaces(id: string): Observable<any> {
    return this._http.get(`${this._baseUrl}${id}`);
  }
}
