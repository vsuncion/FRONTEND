import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomMaterialModule } from '../../../core/material.module';
import { SesionesTemaNuevoComponent } from './sesiones-tema-nuevo/sesiones-tema-nuevo.component';
import { SharedModule } from 'src/app/core/shared.module';
import { SHARED_SERVICE } from 'src/app/services';


@NgModule({
  declarations: [
    // SesionesTemaNuevoComponent
  ],
  imports: [
    // CommonModule,
    // NgxMaterialTimepickerModule,
    // SharedModule,
    // CustomMaterialModule,
  ],
  providers: [
    // ...SHARED_SERVICE
  ]
})
export class SesionTemaModule {
}
