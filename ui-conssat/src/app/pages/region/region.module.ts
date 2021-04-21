import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegionesComponent } from './regiones/regiones.component';
import { CustomMaterialModule } from '../../core/material.module';
import { RegionNuevoComponent } from './region-nuevo/region-nuevo.component';
import { RegionEditarComponent } from './region-editar/region-editar.component';
import { RegionRoutingModule } from './region-routing.module';
import { SharedModule } from 'src/app/core/shared.module';
import { SHARED_SERVICE } from 'src/app/services';
import { MAT_DATE_LOCALE } from '@angular/material';


@NgModule({
  declarations: [
    RegionesComponent,
    RegionNuevoComponent,
    RegionEditarComponent
  ],
  imports: [
    CommonModule,
    RegionRoutingModule,
    SharedModule,
    CustomMaterialModule,
  ],
  providers: [
    // ...SHARED_SERVICE
    {provide: MAT_DATE_LOCALE, useValue: 'es-GB'}
  ]
})
export class RegionModule { }
