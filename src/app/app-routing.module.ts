import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './helper/auth.guards';
import { PageNotFoundComponent } from './page/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path:'', loadChildren: () => import('./page/page.module').then(x => x.PageModule),
    canActivate:[AuthGuard]},
  {
    path:'login', loadChildren: () => import('./login/login.module').then(x => x.LoginModule)
  },
  {path:'**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
