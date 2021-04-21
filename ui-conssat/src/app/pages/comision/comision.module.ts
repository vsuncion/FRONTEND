import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComisionesComponent } from './comisiones/comisiones.component';
import { CustomMaterialModule } from 'src/app/core/material.module';
import { ComisionesNuevoComponent } from './comisiones-nuevo/comisiones-nuevo.component';
import { ComisionesEditarComponent } from './comisiones-editar/comisiones-editar.component';
import { ComisionIntegrantesComponent } from './comision-integrantes/comision-integrantes.component';
import { ComisionIntegrantesEditarComponent } from './comision-integrantes-editar/comision-integrantes-editar.component';
import { ComisionIntegrantesVerComponent } from './comision-integrantes-ver/comision-integrantes-ver.component';
import { ComisionRoutingModule } from './comision-routing.module';
import { SharedModule } from 'src/app/core/shared.module';
import { SHARED_SERVICE } from 'src/app/services';
import { MAT_DATE_LOCALE } from '@angular/material';



@NgModule({
  declarations: [
    ComisionesComponent,
    ComisionesNuevoComponent,
    ComisionesEditarComponent,
    ComisionIntegrantesComponent,
    ComisionIntegrantesEditarComponent,
    ComisionIntegrantesVerComponent
  ],
  imports: [
    CommonModule,
    ComisionRoutingModule,
    SharedModule,
    CustomMaterialModule,
  ],
  providers: [
    // ...SHARED_SERVICE
    {provide: MAT_DATE_LOCALE, useValue: 'es-GB'}
  ]
})
export class ComisionModule { }
