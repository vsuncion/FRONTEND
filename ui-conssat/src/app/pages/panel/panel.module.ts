import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe, DatePipe } from '@angular/common';

import { PanelRoutingModule } from './panel-routing.module';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { PanelComponent } from './panel.component';
import { SidebarComponent } from 'src/app/shared/sidebar/sidebar.component';
import { HomeComponent } from '../home/home.component';
import { CustomMaterialModule } from 'src/app/core/material.module';
import { SharedModule } from 'src/app/core/shared.module';
import { MenuService } from 'src/app/services/menu.service';
import { MAT_DATE_LOCALE } from '@angular/material';
import { BuscarComisionComponent } from '../informes-anuales/informes-anuales-nuevo/buscar-comision/buscar-comision.component';
import { BuscarNroSesionComponent } from '../informes-anuales/informes-anuales-nuevo/buscar-nro-sesion/buscar-nro-sesion.component';


@NgModule({
  entryComponents:[
    BuscarComisionComponent,
    BuscarNroSesionComponent,
  ],
  declarations: [
    BuscarComisionComponent,
    BuscarNroSesionComponent,


    FooterComponent,
    HeaderComponent,
    PanelComponent,
    SidebarComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    PanelRoutingModule,
    SharedModule,
    CustomMaterialModule,
  ],
  providers:[
    // MenuService,

    DatePipe,
    DecimalPipe,
    {provide: MAT_DATE_LOCALE, useValue: 'es-GB'}, // DATEPICKER MUESTRA LA FECHA EN FORMATO DD/MM/YYYY
  ]
})
export class PanelModule { }
