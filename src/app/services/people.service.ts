import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPeople } from '../interfaces/people';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  private baseUrl = 'https://swapi.dev/api/';

  constructor(private _http: HttpClient) { }

  getAllUsers(userId: string): Observable<IPeople> {
    return this._http.get<IPeople>(`${this.baseUrl}people/${userId}/`);
  }
}
