import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, of, Subject, takeUntil } from 'rxjs';
import { IFilms, IFilmsMetaData } from 'src/app/interfaces/films';
import { IPeople } from 'src/app/interfaces/people';
import { FilmService } from 'src/app/services/film.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  filmData:IFilms[] = [];
  loading = false;
  private _destroy$ = new Subject<void>();

  constructor(
      private _snackBar: MatSnackBar,
      private _filmService: FilmService,
      private _router: Router) { }

  ngOnInit(): void {
    this.getFilms();
  }

  getFilms(): void {
    this.loading = true;
    this._filmService.getAllFilms().pipe(
      catchError(err => {
        console.log('caught rethrown error, providing fallback value', err);
        this.openSnackBar(err.message);
        return of({} as IFilmsMetaData);
      }),
      takeUntil(this._destroy$))
      .subscribe(result => {
        this.filmData = result.results.sort((a,b) => a.episode_id - b.episode_id);
        this.loading = false;
    })
  }

  showFilm(name:string | undefined) {
    this._router.navigate(['films'],{queryParams: { search: name }});
  }

  openSnackBar(messages: string): void {
    this._snackBar.open(messages, 'close', {
      duration: 5000,
      panelClass: 'snack-bar'
    });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete()
  }
}
