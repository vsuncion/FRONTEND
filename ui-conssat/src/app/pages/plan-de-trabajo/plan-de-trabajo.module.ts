import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanesDeTrabajoComponent } from './planes-de-trabajo/planes-de-trabajo.component';
import { PlanesDeTrabajoNuevoComponent } from './planes-de-trabajo-nuevo/planes-de-trabajo-nuevo.component';
import { PlanesDeTrabajoEditarComponent } from './planes-de-trabajo-editar/planes-de-trabajo-editar.component';
import { PlanesDeTrabajoVerComponent } from './planes-de-trabajo-ver/planes-de-trabajo-ver.component';
import { CustomMaterialModule } from '../../core/material.module';
import { PlanDeTrabajoRoutingModule } from './plan-de-trabajo-routing.module';
import { SharedModule } from 'src/app/core/shared.module';
import { SHARED_SERVICE } from 'src/app/services';
import { MAT_DATE_LOCALE } from '@angular/material';


@NgModule({
  declarations: [
    PlanesDeTrabajoComponent,
    PlanesDeTrabajoNuevoComponent,
    PlanesDeTrabajoEditarComponent,
    PlanesDeTrabajoVerComponent
  ],
  imports: [
    CommonModule,
    PlanDeTrabajoRoutingModule,
    SharedModule,
    CustomMaterialModule,
  ],
  providers: [
    // ...SHARED_SERVICE
    {provide: MAT_DATE_LOCALE, useValue: 'es-GB'}
  ]
})
export class PlanDeTrabajoModule {
}
