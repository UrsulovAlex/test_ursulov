import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { repeat, delay, takeWhile, finalize} from 'rxjs/operators';
import { IJwtToken } from '../interfaces/jwt-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  JWTtoken = '';
  _doQuery: boolean = true;


  constructor(private _router: Router) { }

  authenticate(username: string, password: string): void {
    if(username.length && password.length) {
      this.generateJwtToken(username);
      localStorage.setItem('Bearer', this.JWTtoken);
      localStorage.setItem('User', username);
      this._router.navigate(['dashboard']);
      this.sessionCheck();
    }
  }

  generateJwtToken(name: string): void {
    this.JWTtoken = JSON.stringify(Object.assign({
      exp: new Date().getTime() + 3 * 60 * 1000,
      name: name,
      permissions:['delete', 'edit', 'read']
    }));
  }

  checkLogin(): boolean {
    if (localStorage.getItem('Bearer')) { 
        return true } else { 
        return false } 
  }

  sessionCheck(): void {
    let getToken: IJwtToken = JSON.parse(localStorage.getItem('Bearer') || '');
    of(getToken).pipe(
      delay(1000),
      repeat(),
      takeWhile(()=> this._doQuery),
      finalize(() => this.logOut())
    ).subscribe((value: IJwtToken) => {
      let newDate = new Date().getTime();
      if(value.exp < newDate) {
        this._doQuery = false;
      }
    })
  }

  logOut(): void {
    localStorage.removeItem('Bearer');
    localStorage.removeItem('User');
    this._router.navigate(['login']);
  }
}
