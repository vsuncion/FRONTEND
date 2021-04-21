import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorrelativoNuevoComponent } from './correlativo-nuevo/correlativo-nuevo.component';
import { CorrelativoEditarComponent } from './correlativo-editar/correlativo-editar.component';
import { CorrelativoComponent } from './correlativo/correlativo.component';
import { CustomMaterialModule } from '../../core/material.module';
import { CorrelativoRoutingModule } from './correlativo-routing.module';
import { SharedModule } from 'src/app/core/shared.module';
import { SHARED_SERVICE } from 'src/app/services';
import { MAT_DATE_LOCALE } from '@angular/material';

@NgModule({
  declarations: [
    CorrelativoNuevoComponent,
    CorrelativoEditarComponent,
    CorrelativoComponent
  ],
  imports: [
    CommonModule,
    CorrelativoRoutingModule,
    SharedModule,
    CustomMaterialModule
  ],
  providers: [
    // ...SHARED_SERVICE
    {provide: MAT_DATE_LOCALE, useValue: 'es-GB'}
  ]
})
export class CorrelativoModule { }
