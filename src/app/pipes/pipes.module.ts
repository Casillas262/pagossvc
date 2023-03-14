import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from './imagen.pipe';
import { EscapeHtmlPipe } from './keep-html.pipe';



@NgModule({
  declarations: [
    ImagenPipe,
    EscapeHtmlPipe
  ],
  exports: [
    ImagenPipe,
    EscapeHtmlPipe
  ],
  imports: [
    CommonModule,
  ]
})
export class PipesModule { }
