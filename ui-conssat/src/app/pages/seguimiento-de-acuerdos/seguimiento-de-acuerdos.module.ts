import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeguimientoComponent } from './seguimiento/seguimiento.component';
import { CustomMaterialModule } from '../../core/material.module';
import { SeguimientoActaComponent } from './seguimiento-acta/seguimiento-acta.component';
import { DatosDeSesionComponent } from './componentes/datos-de-sesion/datos-de-sesion.component';
import { AccionRealizadaComponent } from './componentes/accion-realizada/accion-realizada.component';
import { SeguimientoAcuerdosPorActaComponent } from './seguimiento-acuerdos-por-acta/seguimiento-acuerdos-por-acta.component';
import { SharedModule } from 'src/app/core/shared.module';
import { SeguimientoDeAcuerdosRoutingModule } from './seguimiento-de-acuerdos-routing.module';
import { SHARED_SERVICE } from 'src/app/services';
import { AccionEditarComponent } from './componentes/accion-editar/accion-editar.component';
import { MAT_DATE_LOCALE } from '@angular/material';


@NgModule({
  entryComponents:[
    AccionEditarComponent,
  ],
  declarations: [
    SeguimientoComponent,
    SeguimientoActaComponent,
    DatosDeSesionComponent,
    AccionRealizadaComponent,
    SeguimientoAcuerdosPorActaComponent,
    AccionEditarComponent,
  ],
  imports: [
    CommonModule,
    SeguimientoDeAcuerdosRoutingModule,
    SharedModule,
    CustomMaterialModule,
  ],
  providers: [
    // ...SHARED_SERVICE
    {provide: MAT_DATE_LOCALE, useValue: 'es-GB'}
  ]
})
export class SeguimientoDeAcuerdosModule {
}
