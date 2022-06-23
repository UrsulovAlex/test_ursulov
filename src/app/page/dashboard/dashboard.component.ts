import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { IFilms } from 'src/app/interfaces/films';
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

  constructor(private _filmService: FilmService,
              private _router: Router) { }

  ngOnInit(): void {
    this.getFilms();
  }

  getFilms(): void {
    this.loading = true;
    this._filmService.getAllFilms().pipe(takeUntil(this._destroy$))
      .subscribe(result => {
        this.filmData = result.results.sort((a,b) => a.episode_id - b.episode_id);
        this.loading = false;
    })
  }

  showFilm(name:string | undefined) {
    this._router.navigate(['films'],{queryParams: { search: name }});
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete()
  }
}
