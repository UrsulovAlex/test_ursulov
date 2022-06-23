import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { MatirialModule } from '../matirial/matirial.module';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from './loading/loading.component';
import { DialogComponent } from './dialog/dialog.component';



@NgModule({
  declarations: [
    HeaderComponent,
    MenuComponent,
    LoadingComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    MatirialModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    MenuComponent,
    LoadingComponent,
    DialogComponent
  ]
})
export class SharedElementsModule { }
