import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SesionesAsistenciaNuevoComponent } from './sesiones-asistencia-nuevo/sesiones-asistencia-nuevo.component';
import { CustomMaterialModule } from '../../../core/material.module';
import { RegistroAsistenteComponent } from './sesiones-asistencia-nuevo/registro-asistente/registro-asistente.component';
import { InformacionAsistenteComponent } from './sesiones-asistencia-nuevo/informacion-asistente/informacion-asistente.component';
import { SHARED_SERVICE } from 'src/app/services';
import { SharedModule } from 'src/app/core/shared.module';



@NgModule({
  declarations: [
    // SesionesAsistenciaNuevoComponent,
    // RegistroAsistenteComponent,
    // InformacionAsistenteComponent,

  ],
  entryComponents: [
    // RegistroAsistenteComponent,
    // InformacionAsistenteComponent
  ],
  imports: [
    // CommonModule,
    // NgxMaterialTimepickerModule,
    // SharedModule,
    // CustomMaterialModule,
  ],
  providers: [
    // ...SHARED_SERVICE
  ],
  // exports: [
  //   SesionesAsistenciaNuevoComponent
  // ]
})
export class SesionAsistenciaModule {
}
