import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoletinesComponent } from './boletines/boletines.component';
import { BoletinesNuevoComponent } from './boletines-nuevo/boletines-nuevo.component';
import { BoletinesEditarComponent } from './boletines-editar/boletines-editar.component';
import { BoletinesVerComponent } from './boletines-ver/boletines-ver.component';
import { CustomMaterialModule } from '../../core/material.module';
import { BoletinRoutingModule } from './boletin-routing.module';
import { SharedModule } from 'src/app/core/shared.module';
import { SHARED_SERVICE } from 'src/app/services';
import { MAT_DATE_LOCALE } from '@angular/material';


@NgModule({
  declarations: [
    BoletinesComponent,
    BoletinesNuevoComponent,
    BoletinesEditarComponent,
    BoletinesVerComponent
  ],
  imports: [
    CommonModule,
    BoletinRoutingModule,
    SharedModule,
    CustomMaterialModule,
  ],
  providers: [
    // ...SHARED_SERVICE
    {provide: MAT_DATE_LOCALE, useValue: 'es-GB'}
  ]
})
export class BoletinModule {
}
