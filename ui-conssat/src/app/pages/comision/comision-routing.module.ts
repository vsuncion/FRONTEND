import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComisionesComponent } from './comisiones/comisiones.component';
import { ComisionesNuevoComponent } from './comisiones-nuevo/comisiones-nuevo.component';
import { ComisionesEditarComponent } from './comisiones-editar/comisiones-editar.component';
import { ComisionIntegrantesComponent } from './comision-integrantes/comision-integrantes.component';
import { ComisionIntegrantesEditarComponent } from './comision-integrantes-editar/comision-integrantes-editar.component';
import { ComisionIntegrantesVerComponent } from './comision-integrantes-ver/comision-integrantes-ver.component';

const routes: Routes = [
  { path: '', component: ComisionesComponent },
  { path: 'nuevo', component: ComisionesNuevoComponent },
  { path: 'editar/:id', component: ComisionesEditarComponent },
  { path: ':id/integrantes', component: ComisionIntegrantesComponent },
  { path: ':id/integrantes/editar/:idIntegrante', component: ComisionIntegrantesEditarComponent },
  { path: ':id/integrantes/ver/:idIntegrante', component: ComisionIntegrantesVerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComisionRoutingModule { }
