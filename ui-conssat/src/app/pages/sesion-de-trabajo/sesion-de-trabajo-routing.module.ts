import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SesionesDeTrabajoComponent } from './sesiones-de-trabajo/sesiones-de-trabajo.component';
import { SesionesDeTrabajoNuevoComponent } from './sesiones-de-trabajo-nuevo/sesiones-de-trabajo-nuevo.component';
import { SesionesDeTrabajoEditarComponent } from './sesiones-de-trabajo-editar/sesiones-de-trabajo-editar.component';
import { SesionesDeTrabajoVerComponent } from './sesiones-de-trabajo-ver/sesiones-de-trabajo-ver.component';
import { SesionesAsistenciaNuevoComponent } from './sesion-asistencia/sesiones-asistencia-nuevo/sesiones-asistencia-nuevo.component';
import { SesionesTemaNuevoComponent } from './sesion-tema/sesiones-tema-nuevo/sesiones-tema-nuevo.component';
import { SesionesActaNuevoComponent } from './sesion-acta/sesiones-acta-nuevo/sesiones-acta-nuevo.component';
import { SesionesActaEditarComponent } from './sesion-acta/sesiones-acta-editar/sesiones-acta-editar.component';


const routes: Routes = [
  { path: '', component: SesionesDeTrabajoComponent },
  { path: 'nuevo', component: SesionesDeTrabajoNuevoComponent },
  { path: 'editar/:id', component: SesionesDeTrabajoEditarComponent },
  { path: 'ver/:id', component: SesionesDeTrabajoVerComponent },
  { path: ':id/asistencia', component: SesionesAsistenciaNuevoComponent },
  { path: ':id/tema', component: SesionesTemaNuevoComponent },
  { path: ':id/acta/nuevo', component: SesionesActaNuevoComponent },
  { path: ':id/acta/editar/:idActa', component: SesionesActaEditarComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SesionDeTrabajoRoutingModule {
}
