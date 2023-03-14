
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//modulos
import { AuthModule } from './auth/auth.module';
import { PagesModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { httpInterceptorProviders } from './http-interceptors/index';
import { AuthInterceptor } from './http-interceptors/auth-interceptor';

// paginacion
import { NgxPaginationModule } from 'ngx-pagination';

//paypal
import { NgxPayPalModule } from 'ngx-paypal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    RouterModule,
    SharedModule,
    PagesModule,
    NgxPaginationModule,
    NgxPayPalModule,
    NgbModule,
    NgxSpinnerModule

  ],
  providers: [
    // httpInterceptorProvidßers,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
