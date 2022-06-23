import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IStarships } from '../interfaces/starships';

@Injectable({
  providedIn: 'root'
})
export class StarshipsService {
  private _baseUrl = 'https://swapi.dev/api/starships/';

  constructor(private _http: HttpClient) { }

  getSelectSrarships(id: string): Observable<IStarships> {
    return this._http.get<IStarships>(`${this._baseUrl}${id}`)
  }
}
