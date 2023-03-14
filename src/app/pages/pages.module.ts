import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//componentes
import { DashboardComponent } from './dashboard/dashboard.component';

//modulos

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
//helpers
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';

import {PagesComponent} from './pages.component';
import { ConfModule } from './conf/conf.module';
import { SharedModule } from '../shared/shared.module';
import { PipesModule } from '../pipes/pipes.module';
import { ComponentsModule } from '../components/components.module';

// paginacion
import { NgxPaginationModule } from 'ngx-pagination';

//paypal
import { NgxPayPalModule } from 'ngx-paypal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from "ngx-spinner";
//Qr
import { QRCodeModule } from 'angular2-qrcode';
import { ContactComponent } from './contact/contact.component';
import { DashboardUserComponent } from './dashboard-user/dashboard-user.component';
import { DirectorioEditComponent } from './directorio/directorio-edit/directorio-edit.component';
import { DirectorioIndexComponent } from './directorio/directorio-index/directorio-index.component';
import { DirectorioViewPublicComponent } from './directorio/directorio-view-public/directorio-view-public.component';
import { DirectorioViewComponent } from './directorio/directorio-view/directorio-view.component';
import { HelpComponent } from './help/help.component';
import { PaymentDetailsComponent } from './payments/payment-details/payment-details.component';
import { PaymentEditComponent } from './payments/payment-edit/payment-edit.component';
import { PaymentsComponent } from './payments/payments.component';
import { ReportarPagoComponent } from './payments/reportar-pago/reportar-pago.component';
import { PlanComponent } from './planes/plan/plan.component';
import { PlanesPageComponent } from './planes/planes-page/planes-page.component';
import { ProfileComponent } from './profile/profile.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserHistorialpagosComponent } from './user-historialpagos/user-historialpagos.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UsersComponent } from './users/users.component';
import { DirectorioCreateComponent } from './directorio/directorio-create/directorio-create.component';
@NgModule({
  declarations: [
    DashboardComponent,
    DashboardAdminComponent,
    PagesComponent,
    ProfileComponent,
    UserDetailsComponent,
    UsersComponent,
    UserHistorialpagosComponent,
    HelpComponent,
    ContactComponent,
    DashboardUserComponent,
    UserProfileComponent,
    PagesComponent,
    DirectorioIndexComponent,
    DirectorioEditComponent,
    DirectorioViewComponent,
    DirectorioCreateComponent,
    PlanesPageComponent,
    PlanComponent,
    PaymentDetailsComponent,
    PaymentsComponent,
    PaymentEditComponent,
    ReportarPagoComponent,
    DirectorioViewPublicComponent
  ],
  exports: [
    DashboardComponent,
    DashboardAdminComponent,
    ProfileComponent,
    UserDetailsComponent,
    UsersComponent,
    UserHistorialpagosComponent,
    HelpComponent,
    ContactComponent,
    DashboardUserComponent,
    UserProfileComponent,
    PagesComponent,
    DirectorioIndexComponent,
    DirectorioEditComponent,
    DirectorioCreateComponent,
    DirectorioViewComponent,
    PlanesPageComponent,
    PlanComponent,
    PaymentDetailsComponent,
    PaymentsComponent,
    PaymentEditComponent,
    ReportarPagoComponent,
    DirectorioViewPublicComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    PipesModule,
    ConfModule,
    ComponentsModule,
    NgxPayPalModule,
    NgbModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    QRCodeModule

  ],
  providers: [
  ],
})
export class PagesModule { }
