import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorrelativocomisionComponent} from './correlativocomision/correlativocomision.component'
import { CorrelativocomisionroutingModule } from './correlativocomision-routing.module';
import { SharedModule } from 'src/app/core/shared.module';
import { CustomMaterialModule } from 'src/app/core/material.module';
import { MAT_DATE_LOCALE } from '@angular/material';
import { CorrelativoscomisionesNuevoComponent } from './correlativoscomisiones-nuevo/correlativoscomisiones-nuevo.component';
import { CorrelativoscomisionesEditarComponent } from './correlativoscomisiones-editar/correlativoscomisiones-editar.component';


@NgModule({
  declarations: [
    CorrelativocomisionComponent,
    CorrelativoscomisionesNuevoComponent,
    CorrelativoscomisionesEditarComponent
  ],
  imports: [
    CommonModule,
    CorrelativocomisionroutingModule,
    SharedModule,
    CustomMaterialModule
  ],
  providers: [
    // ...SHARED_SERVICE
    {provide: MAT_DATE_LOCALE, useValue: 'es-GB'}
  ]
})
export class CorrelativocomisionesModule { }
