import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFilms, IFilmsMetaData } from '../interfaces/films';

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  private _baseUrl = 'https://swapi.dev/api/films/';

  constructor(private _http: HttpClient) { }

  getAllFilms(): Observable<IFilmsMetaData>{
    return this._http.get<IFilmsMetaData>(this._baseUrl);
  }

  getFilms(name:string): Observable<IFilmsMetaData> {
    let queryParams = new HttpParams().append("search",name);
    return this._http.get<IFilmsMetaData>(this._baseUrl, {params: queryParams});
  }

  getSelectFilms(id:string): Observable<IFilms>{
    return this._http.get<IFilms>(`${this._baseUrl}${id}`);
  } 
}
