import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { from, of, Subject } from 'rxjs';
import { IDialogData } from 'src/app/interfaces/dialog-data';
import { IPeople } from 'src/app/interfaces/people';
import { IPlanets } from 'src/app/interfaces/planets';
import { IStarships } from 'src/app/interfaces/starships';
import { typeParams } from 'src/app/interfaces/type';
import { FilmService } from 'src/app/services/film.service';
import { PlanetsService } from 'src/app/services/planets.service';
import { StarshipsService } from 'src/app/services/starships.service';
import { catchError, mergeMap, takeUntil, toArray } from 'rxjs/operators';
import { PeopleService } from 'src/app/services/people.service';
import { SpeciesService } from 'src/app/services/species.service';
import { IFilms } from 'src/app/interfaces/films';
import { VehiclesService } from 'src/app/services/vehicles.service';
import { IVehicles } from 'src/app/interfaces/vehicles';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit, OnDestroy {
  urlPeople: string[] = [];
  urlStarship: string[] = [];
  urlPlanet: string[] = [];
  urlSpacies: string[] =[];
  urlFilms: string[] = [];
  urlHomeWorldr: string[]=[];
  urlVehicles: string[] = [];
  listPeople: string[] = [];
  listStarships: string[] = [];
  listPlanets: string[] = [];
  listSpacies: string[] =[];
  listFilms: string[] = [];
  listVihicles: string[] = [];
  homeWorldr: string = '';
  loading = false; 
  private _distroy$ = new Subject<void>()

  constructor(@Inject(MAT_DIALOG_DATA) public data: IDialogData,
    private _filmService: FilmService,
    private _starshipsService: StarshipsService,
    private _planetsService: PlanetsService,
    private _peopleService: PeopleService,
    private _speciesService: SpeciesService,
    private _vehiclesService: VehiclesService,
    private _snackBar: MatSnackBar, 
  ) { }

  ngOnInit(): void {
    this.initList(this.data.template);
  }

  getUrl(list: string[]): string[] {
    let params: string[] = [];
    list.forEach(el => {
      let item = el.split('/').splice(-2, 1);
      params.push(item[0]);
    });
    return params;
  }

  initList(type: typeParams): void {
    this.loading = true;
    switch(type){
      case 'people':
        this.urlSpacies = this.getUrl(this.data.data.species);
        this.urlFilms = this.getUrl(this.data.data.films);
        this.urlHomeWorldr = this.getUrl([this.data.data.homeworld]);
        this.urlStarship = this.getUrl(this.data.data.starships);
        this.urlVehicles = this.getUrl(this.data.data.vehicles);
        this.getSpacies();
        this.getFilms();
        this.getPlanets();
        this.getStarships();
        this.getVehicles();
        break;
      case 'planets': 
        this.urlPeople = this.getUrl(this.data.data.residents);
        this.urlFilms = this.getUrl(this.data.data.films);
        this.getPeopleList();
        this.getFilms();
        break;
      case 'starship':
        this.urlPeople = this.getUrl(this.data.data.pilots);
        this.urlFilms = this.getUrl(this.data.data.films);
        this.getFilms();
        this.getPeopleList();
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
      takeUntil(this._distroy$)
    ).subscribe(result => {
      this.listStarships = result.map(_ => _.name);
      if(this.urlStarship.length === this.listStarships.length) {
        this.checkLoading();
      }
    });
  }

  getFilms(): void {
    from(this.urlFilms).pipe(
      mergeMap(params => this._filmService.getSelectFilms(params)),
      catchError(err => {
        console.log('caught rethrown error, providing fallback value', err);
        this.openSnackBar(err.message);
        return of({} as IFilms);
      }),
      toArray(),
      takeUntil(this._distroy$)
    ).subscribe(result => {
      this.listFilms = result.map(_ =>_.title);
      if(this.listFilms.length === this.listStarships.length) {
        this.checkLoading();
      }
    });
  }

  getSpacies(): void {
    from(this.urlSpacies).pipe(
      mergeMap(url => this._speciesService.getSpaces(url)),
      catchError(err => {
        console.log('caught rethrown error, providing fallback value', err);
        this.openSnackBar(err.message);
        return of('');
      }),
      toArray(),
      takeUntil(this._distroy$)
    ).subscribe(result => {
      this.listSpacies  = result.map(_ =>_.name);
      if(this.urlSpacies.length === this.listSpacies.length) {
        this.checkLoading();
      }
    });
  }

  getPlanets(): void {
    let urlParams: string[] = [];
    this.data.template === 'planets' ? urlParams = this.urlPlanet : urlParams = this.urlHomeWorldr;
    from(urlParams).pipe(
      mergeMap(params => this._planetsService.getAllPlanets(params)),
      catchError(err => {
        console.log('caught rethrown error, providing fallback value', err);
        this.openSnackBar(err.message);
        return of({} as IPlanets);
      }),
      toArray(), 
      takeUntil(this._distroy$)
    ).subscribe(result => {
      this.data.template === 'planets' ? this.listPlanets = result.map(_ => _.name) :
        this.homeWorldr = result[0].name;
      
      if(this.urlPlanet.length === this.listPlanets.length) {
        this.checkLoading();
      }

      if(this.homeWorldr.length) {
        this.checkLoading();
      } 
    });
  }

  getVehicles(): void {
    from(this.urlVehicles).pipe(
      mergeMap(url => this._vehiclesService.getSelectVehicles(url)),
      catchError(err => {
        console.log('caught rethrown error, providing fallback value', err);
        this.openSnackBar(err.message);
        return of({} as IVehicles);
      }),
      toArray(),
      takeUntil(this._distroy$)
    ).subscribe(result => {
      this.listVihicles  = result.map(_ =>_.name);
      if(this.urlVehicles.length === this.listVihicles.length) {
        this.checkLoading();
      }
    });

  }

  getPeopleList(): void {
    from(this.urlPeople).pipe(
      mergeMap(params => this._peopleService.getAllUsers(params)),
      catchError(err => {
        console.log('caught rethrown error, providing fallback value', err);
        this.openSnackBar(err.message);
        return of({} as IPeople);
      }),
      toArray(),
      takeUntil(this._distroy$)
    ).subscribe(result => {
      this.listPeople = result.map(_ => _.name); 
      if(this.urlPeople.length === this.listPeople.length) {
        this.checkLoading();
      }
    });
  }

  checkLoading(): void {
    switch(this.data.template) {
      case 'people': 
        if(this.urlPeople.length === this.listPeople.length &&
          this.urlStarship.length === this.listStarships.length &&
          this.urlSpacies.length === this.listSpacies.length &&
          this.urlVehicles.length === this.listVihicles.length && 
          this.homeWorldr.length) { this.loading = false };
      break;
      case 'planets':
        if(this.urlPeople.length === this.listPeople.length &&
          this.listFilms.length === this.listStarships.length) { this.loading = false };
        break;
      case 'starship':
        if(this.urlPeople.length === this.listPeople.length &&
          this.listFilms.length === this.listStarships.length) { this.loading = false };
        break;
    }
  }

  openSnackBar(messages: string): void {
    this._snackBar.open(messages, 'close', {
      duration: 5000,
      panelClass: 'snack-bar'
    });
  }

  ngOnDestroy(): void {
    this._distroy$.next();
    this._distroy$.complete();
  }
}
