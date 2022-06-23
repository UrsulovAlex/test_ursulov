import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageModule } from './page/page.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedElementsModule } from './shared-elements/shared-elements.module';
import { MatirialModule } from './matirial/matirial.module';
import { AddHeaderInterceptor } from './helper/add-header-intersepter';
import { AuthGuard } from './helper/auth.guards';
import { ExceptionIntercept } from './helper/exeption-interseptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PageModule,
    BrowserAnimationsModule,
    SharedElementsModule,
    MatirialModule
  ],
  providers: [{
      provide: HTTP_INTERCEPTORS,
      useClass: AddHeaderInterceptor,
      multi: true
    },{
      provide: HTTP_INTERCEPTORS,
      useClass: ExceptionIntercept,
      multi: true
    },
    AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
