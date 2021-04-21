import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformesAnualesNuevoComponent } from './informes-anuales-nuevo/informes-anuales-nuevo.component';
import { InformesAnualesEditarComponent } from './informes-anuales-editar/informes-anuales-editar.component';
import { InformesAnualesVerComponent } from './informes-anuales-ver/informes-anuales-ver.component';
import { InformesAnualesComponent } from './informes-anuales/informes-anuales.component';
import { CustomMaterialModule } from '../../core/material.module';
import { BuscarComisionComponent } from './informes-anuales-nuevo/buscar-comision/buscar-comision.component';
import { BuscarNroSesionComponent } from './informes-anuales-nuevo/buscar-nro-sesion/buscar-nro-sesion.component';
import { InformesAnualesRoutingModule } from './informes-anuales-routing.module';
import { SharedModule } from 'src/app/core/shared.module';
import { SHARED_SERVICE } from 'src/app/services';
import { MAT_DATE_LOCALE } from '@angular/material';


@NgModule({
  entryComponents: [
    // BuscarComisionComponent,
    // BuscarNroSesionComponent
  ],
  declarations: [
    InformesAnualesNuevoComponent,
    InformesAnualesEditarComponent,
    InformesAnualesVerComponent,
    InformesAnualesComponent,
    // BuscarComisionComponent,
    // BuscarNroSesionComponent
  ],
  imports: [
    CommonModule,
    InformesAnualesRoutingModule,
    SharedModule,
    CustomMaterialModule,
  ],
  providers: [
    // ...SHARED_SERVICE
    {provide: MAT_DATE_LOCALE, useValue: 'es-GB'}
  ]
})
export class InformesAnualesModule {
}
