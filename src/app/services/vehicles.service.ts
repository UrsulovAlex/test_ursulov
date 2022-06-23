import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IVehicles } from '../interfaces/vehicles';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {
  private _baseUrl = 'https://swapi.dev/api/vehicles/';

  constructor(private _http: HttpClient) { }

  getSelectVehicles(id:string): Observable<IVehicles>{
    return this._http.get<IVehicles>(`${this._baseUrl}${id}`);
  } 
}
