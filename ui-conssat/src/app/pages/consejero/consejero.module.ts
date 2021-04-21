import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsejerosComponent } from './consejeros/consejeros.component';
import { ConsejerosNuevoComponent } from './consejeros-nuevo/consejeros-nuevo.component';
import { ConsejerosEditarComponent } from './consejeros-editar/consejeros-editar.component';
import { ConsejerosVerComponent } from './consejeros-ver/consejeros-ver.component';
import { CustomMaterialModule } from '../../core/material.module';
import { ConsejeroRoutingModule } from './consejero-routing.module';
import { SharedModule } from 'src/app/core/shared.module';
import { SHARED_SERVICE } from 'src/app/services';
import { MAT_DATE_LOCALE } from '@angular/material';


@NgModule({
  declarations: [
    ConsejerosComponent,
    ConsejerosNuevoComponent,
    ConsejerosEditarComponent,
    ConsejerosVerComponent
  ],
  imports: [
    CommonModule,
    ConsejeroRoutingModule,
    SharedModule,
    CustomMaterialModule,
  ],
  providers: [
    // ...SHARED_SERVICE
    {provide: MAT_DATE_LOCALE, useValue: 'es-GB'}
  ]
})
export class ConsejeroModule {
}
