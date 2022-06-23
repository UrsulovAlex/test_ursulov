import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {

  constructor(private _authenticationService: AuthenticationService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
      if(this._authenticationService.checkLogin()) {
        req = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${this._authenticationService.JWTtoken}`)
        });
      }
    return next.handle(req);
  }
}

