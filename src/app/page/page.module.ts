import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FilmsComponent } from './films/films.component';
import { MatirialModule } from '../matirial/matirial.module';
import { PageRoutingModule } from './page-routing.module';
import { SharedElementsModule } from '../shared-elements/shared-elements.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';



@NgModule({
  declarations: [
    DashboardComponent,
    FilmsComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    MatirialModule,
    PageRoutingModule,
    SharedElementsModule
  ]
})
export class PageModule { }
