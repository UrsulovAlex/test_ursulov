import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { from, of, Subject, } from 'rxjs';
import { catchError, mergeMap, takeUntil, toArray } from 'rxjs/operators';
import { IFilms } from 'src/app/interfaces/films';
import { FilmService } from 'src/app/services/film.service';
import { PeopleService } from 'src/app/services/people.service';
import { PlanetsService } from 'src/app/services/planets.service';
import { StarshipsService } from 'src/app/services/starships.service';
import { IStarships } from 'src/app/interfaces/starships';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IPeople } from 'src/app/interfaces/people';
import { typeParams } from 'src/app/interfaces/type';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../shared-elements/dialog/dialog.component'
import { IPlanets } from 'src/app/interfaces/planets';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss']
})
export class FilmsComponent implements OnInit, OnDestroy {
  urlUser: string[] = [];
  urlStarship: string[] = [];
  urlPlanet: string[] = [];
  listUsers: MatTableDataSource<IPeople> = new MatTableDataSource<IPeople>([]);
  listStarships:  MatTableDataSource<IStarships> = new MatTableDataSource<IStarships>([]);
  listPlanets: MatTableDataSource<IPlanets> = new MatTableDataSource<IPlanets>([]);
  displayedColumns: string[] = ['name', 'gender', 'height', 'mass', 'created'];
  displayedColumnsStarships: string[] = ['name', 'starship_class', 'passengers', 'length', 'created'];
  displayedColumnsPlanets: string[] = ['name', 'climate', 'gravity', 'population', 'created'];
  loading = false;
  films!: IFilms;
  private _destroy$ = new Subject<void>();
  @ViewChild('matSortOne') set matSort(sort: MatSort){
    this.listStarships.sort = sort;}
  @ViewChild('matSortTwo') set matSortTwo(sort: MatSort){
    this.listUsers.sort = sort;}
  @ViewChild('matSortThree') set matSortThree(sort: MatSort){
    this.listPlanets.sort = sort;}

  constructor(
    private _snackBar: MatSnackBar,
    private _peopleService: PeopleService,
    private _route: ActivatedRoute,
    private _filmService: FilmService,
    private _starshipsService: StarshipsService,
    private _planetsService: PlanetsService,
    private _dialog: MatDialog) { 
    }

  ngOnInit(): void {
    this.loading = true;
    this.getFilms();
  }

  getFilms(): void {
    let queryParams = '';
    this._route.queryParams.subscribe(params => queryParams = params['search']);
    if(queryParams.length) {
        this._filmService.getFilms(queryParams).subscribe(result => {
        this.films = result.results[0];
        this.getParams('people');
        this.getParams('planets');
        this.getParams('starship');
      })
    }
  }

  getUrl(list: string[]): string[] {
    let params: string[] = [];
    list.forEach(el => {
      let item = el.split('/').splice(-2, 1);
      params.push(item[0]);
    });
    return params;
  }

  getParams(type: typeParams): void {
    switch(type){
      case 'people':
        this.urlUser = this.getUrl(this.films.characters);
        this.getPeopleList();
        break;
      case 'planets': 
        this.urlPlanet = this.getUrl(this.films.planets);
        this.getPlanets();
        break;
      case 'starship':
        this.urlStarship = this.getUrl(this.films.starships);
        this.getStarships();
        break;
    }
  }

  getStarships(): void {
    from(this.urlStarship).pipe(
      mergeMap(params => this._starshipsService.getSelectSrarships(params)),
      catchError(err => {
        console.log('caught rethrown error, providing fallback value', err);
        this.openSnackBar(err.message);
        return of({} as IStarships);
      }),
      toArray(),
      takeUntil(this._destroy$)
    ).subscribe(result => {
      this.listStarships.data = result;
      if(this.urlStarship.length === this.listStarships.data.length) {
        this.checkLoading();
      }
    });
  }

  getPeopleList(): void {
    from(this.urlUser).pipe(
      mergeMap(params => this._peopleService.getAllUsers(params)),
      catchError(err => {
        console.log('caught rethrown error, providing fallback value', err);
        this.openSnackBar(err.message);
        return of({} as IPeople);
      }),
      toArray(),
      takeUntil(this._destroy$)
    ).subscribe(result => {
      this.listUsers.data = result;
      if(this.urlUser.length === this.listUsers.data.length) {
        this.checkLoading();
      }
    });
  }

  getPlanets(): void {
    from(this.urlPlanet).pipe(
      mergeMap(params => this._planetsService.getAllPlanets(params)),
      catchError(err => {
        console.log('caught rethrown error, providing fallback value', err);
        this.openSnackBar(err.message);
        return of({} as IPlanets);
      }),
      toArray(),
      takeUntil(this._destroy$)
    ).subscribe(result => {
      this.listPlanets.data = result;
      if(this.urlPlanet.length === this.listPlanets.data.length) {
        this.checkLoading();
      }
    });
  }

  checkLoading(): void {
    if(this.urlUser.length === this.listUsers.data.length &&
      this.listPlanets.data.length === this.urlPlanet.length &&
      this.urlStarship.length === this.listStarships.data.length) 
    { this.loading = false; }
  }

  openSnackBar(messages: string): void {
    this._snackBar.open(messages, 'close', {
      duration: 5000,
      panelClass: 'snack-bar'
    });
  }

  openDialog(item: IPeople | IPlanets | IStarships, template: typeParams): void {
    this._dialog.open( DialogComponent, {
      data: {data: item, template: template},
      disableClose: true,
      panelClass: 'dialog-responsive',
      width: '600px',
    })
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
