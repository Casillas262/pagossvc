import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { DirectorioEditComponent } from './directorio-edit/directorio-edit.component';
import { DirectorioIndexComponent } from './directorio-index/directorio-index.component';
import { DirectorioViewComponent } from './directorio-view/directorio-view.component';
import { DirectorioViewPublicComponent } from './directorio-view-public/directorio-view-public.component';

// angular file uploader
import { AngularFileUploaderModule } from 'angular-file-uploader';

//Qr
import { QRCodeModule } from 'angular2-qrcode';

@NgModule({
  declarations: [
    DirectorioIndexComponent,
    DirectorioEditComponent,
    DirectorioViewComponent,
    DirectorioViewPublicComponent
  ],
  exports: [
    DirectorioIndexComponent,
    DirectorioEditComponent,
    DirectorioViewComponent,
    DirectorioViewPublicComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    PipesModule,
    BrowserAnimationsModule,
    AngularFileUploaderModule,
    QRCodeModule
  ]
})
export class DirectoryModule { }
