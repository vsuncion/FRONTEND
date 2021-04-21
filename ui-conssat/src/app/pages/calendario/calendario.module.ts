import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendariosEditarComponent } from './calendarios-editar/calendarios-editar.component';
import { CalendariosNuevoComponent } from './calendarios-nuevo/calendarios-nuevo.component';
import { CalendariosVerComponent } from './calendarios-ver/calendarios-ver.component';
import { CalendariosComponent } from './calendarios/calendarios.component';
import { CustomMaterialModule } from '../../core/material.module';
import { AgregarParticipanteComponent } from './calendarios-editar/agregar-participante/agregar-participante.component';
import { CalendarioRoutingModule } from './calendario-routing.module';
import { SHARED_SERVICE } from 'src/app/services';
import { SharedModule } from 'src/app/core/shared.module';
import { MAT_DATE_LOCALE } from '@angular/material';


@NgModule({
  entryComponents: [
    AgregarParticipanteComponent
  ],
  declarations: [
    CalendariosEditarComponent,
    CalendariosNuevoComponent,
    CalendariosVerComponent,
    CalendariosComponent,
    AgregarParticipanteComponent
  ],
  imports: [
    CommonModule,
    CalendarioRoutingModule,
    SharedModule,
    CustomMaterialModule,
  ],
  providers: [
    // ...SHARED_SERVICE
    {provide: MAT_DATE_LOCALE, useValue: 'es-GB'}
  ]
})
export class CalendarioModule {
}
