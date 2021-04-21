import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IniciosesionesComponent } from './iniciosesiones/iniciosesiones.component';
import { CustomMaterialModule } from '../../core/material.module';
import { IniciosesionNuevoComponent } from './iniciosesion-nuevo/iniciosesion-nuevo.component';
import { IniciosesionEditarComponent } from './iniciosesion-editar/iniciosesion-editar.component';
import { IniciosesionRolComponent } from './iniciosesion-rol/iniciosesion-rol.component';
import { IniciosesionRoutingModule } from './iniciosesion-routing.module';
import { SharedModule } from 'src/app/core/shared.module';
import { MAT_DATE_LOCALE } from '@angular/material';

@NgModule({
  declarations: [
    IniciosesionesComponent,
    IniciosesionNuevoComponent,
    IniciosesionEditarComponent,
    IniciosesionRolComponent
  ],
  imports: [
    CommonModule,
    IniciosesionRoutingModule,
    SharedModule,
    CustomMaterialModule,
  ],
  providers: [
    // InicioSesionService,
    // FijasService,
    {provide: MAT_DATE_LOCALE, useValue: 'es-GB'}
  ]
})
export class IniciosesionModule { }
