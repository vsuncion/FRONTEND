import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorrelativosesionComponent } from './correlativosesion/correlativosesion.component';
import { CorrelativosesionesroutingModule } from './correlativosesiones-routing.module';
import { SharedModule } from 'src/app/core/shared.module';
import { SHARED_SERVICE } from 'src/app/services';
import { CustomMaterialModule } from '../../core/material.module';
import { MAT_DATE_LOCALE } from '@angular/material';
import { CorrelativosesionNuevoComponent } from './correlativosesion-nuevo/correlativosesion-nuevo.component';
import { CorrelativosesionEditarComponent } from './correlativosesion-editar/correlativosesion-editar.component';

@NgModule({
  declarations: [
    CorrelativosesionComponent,
    CorrelativosesionNuevoComponent,
    CorrelativosesionEditarComponent
  ],
  imports: [
    CommonModule,
    CorrelativosesionesroutingModule,
    SharedModule,
    CustomMaterialModule
  ],
  providers: [
    // ...SHARED_SERVICE
    {provide: MAT_DATE_LOCALE, useValue: 'es-GB'}
  ]
})
export class CorrelativosesionesModule { }
