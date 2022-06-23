import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPlanets } from '../interfaces/planets';

@Injectable({
  providedIn: 'root'
})
export class PlanetsService {
  private _baseUrl = 'https://swapi.dev/api/planets/';

  constructor(private _http: HttpClient) { }

  getAllPlanets(id: string): Observable<IPlanets> {
    return this._http.get<IPlanets>(`${this._baseUrl}${id}`);
  }
}
