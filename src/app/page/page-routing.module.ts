import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FilmsComponent } from './films/films.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path:'dashboard', component: DashboardComponent},
  {path:'films', component: FilmsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
