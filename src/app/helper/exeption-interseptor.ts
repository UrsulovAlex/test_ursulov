import { HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse, HttpInterceptor } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable()
export class ExceptionIntercept implements HttpInterceptor {

    constructor(private _snackBar: MatSnackBar){}

    intercept( request: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                retry(1),
                catchError((error: HttpErrorResponse) => {
                    let message = '';
                    if (error.error instanceof ErrorEvent) {
                        message = `Error: ${error.error.message}`;
                    } else {
                        message = `Error Status: ${error.status}\nMessage: ${error.message}`;
                    }
                    this.showError(message);
                    console.log(message);
                    return throwError(message);
                })
            )
    }

    showError(messages: string): void {
        this._snackBar.open(messages, 'close', {
            duration: 5000,
        });
    }

}