import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SesionesDeTrabajoComponent } from './sesiones-de-trabajo/sesiones-de-trabajo.component';
import { SesionesDeTrabajoNuevoComponent } from './sesiones-de-trabajo-nuevo/sesiones-de-trabajo-nuevo.component';
import { SesionesDeTrabajoEditarComponent } from './sesiones-de-trabajo-editar/sesiones-de-trabajo-editar.component';
import { SesionesDeTrabajoVerComponent } from './sesiones-de-trabajo-ver/sesiones-de-trabajo-ver.component';
import { CustomMaterialModule } from '../../core/material.module';
import { SesionDeTrabajoRoutingModule } from './sesion-de-trabajo-routing.module';
import { SharedModule } from 'src/app/core/shared.module';
import { SHARED_SERVICE } from 'src/app/services';
import { SesionActaModule } from './sesion-acta/sesion-acta.module';
import { SesionTemaModule } from './sesion-tema/sesion-tema.module';
import { SesionAsistenciaModule } from './sesion-asistencia/sesion-asistencia.module';
import { RegistroAsistenteComponent } from './sesion-asistencia/sesiones-asistencia-nuevo/registro-asistente/registro-asistente.component';
import { InformacionAsistenteComponent } from './sesion-asistencia/sesiones-asistencia-nuevo/informacion-asistente/informacion-asistente.component';
import { SesionesActaNuevoComponent } from './sesion-acta/sesiones-acta-nuevo/sesiones-acta-nuevo.component';
import { SesionesFirmanteComponent } from './sesion-acta/componentes/sesiones-firmante/sesiones-firmante.component';
import { SesionesAcuerdoComponent } from './sesion-acta/componentes/sesiones-acuerdo/sesiones-acuerdo.component';
import { SesionesActaEditarComponent } from './sesion-acta/sesiones-acta-editar/sesiones-acta-editar.component';
import { SesionesDatosSesionComponent } from './sesion-acta/componentes/sesiones-datos-sesion/sesiones-datos-sesion.component';
import { SesionesDatosActaComponent } from './sesion-acta/componentes/sesiones-datos-acta/sesiones-datos-acta.component';
import { SesionesTemaNuevoComponent } from './sesion-tema/sesiones-tema-nuevo/sesiones-tema-nuevo.component';
import { SesionesAsistenciaNuevoComponent } from './sesion-asistencia/sesiones-asistencia-nuevo/sesiones-asistencia-nuevo.component';
import { MAT_DATE_LOCALE } from '@angular/material';


@NgModule({
  entryComponents: [
    RegistroAsistenteComponent,
    InformacionAsistenteComponent
  ],
  declarations: [
    SesionesDeTrabajoComponent,
    SesionesDeTrabajoNuevoComponent,
    SesionesDeTrabajoEditarComponent,
    SesionesDeTrabajoVerComponent,
    
    SesionesAsistenciaNuevoComponent,
    RegistroAsistenteComponent,
    InformacionAsistenteComponent,


    SesionesActaNuevoComponent,
    SesionesFirmanteComponent,
    SesionesAcuerdoComponent,
    SesionesActaEditarComponent,
    SesionesDatosSesionComponent,
    SesionesDatosActaComponent,


    SesionesTemaNuevoComponent
  ],
  imports: [
    CommonModule,
    SesionDeTrabajoRoutingModule,
    SharedModule,
    CustomMaterialModule,

    // SesionActaModule,
    // SesionAsistenciaModule,
    // SesionTemaModule,
  ],
  providers: [
    // ...SHARED_SERVICE
    {provide: MAT_DATE_LOCALE, useValue: 'es-GB'}
  ]
})
export class SesionDeTrabajoModule {
}
