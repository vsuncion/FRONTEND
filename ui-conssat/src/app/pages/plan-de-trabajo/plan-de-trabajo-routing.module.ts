import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlanesDeTrabajoComponent } from './planes-de-trabajo/planes-de-trabajo.component';
import { PlanesDeTrabajoNuevoComponent } from './planes-de-trabajo-nuevo/planes-de-trabajo-nuevo.component';
import { PlanesDeTrabajoEditarComponent } from './planes-de-trabajo-editar/planes-de-trabajo-editar.component';
import { PlanesDeTrabajoVerComponent } from './planes-de-trabajo-ver/planes-de-trabajo-ver.component';

const routes: Routes = [
  { path: '', component: PlanesDeTrabajoComponent },
  { path: 'nuevo', component: PlanesDeTrabajoNuevoComponent },
  { path: 'editar/:id', component: PlanesDeTrabajoEditarComponent },
  { path: 'ver/:id', component: PlanesDeTrabajoVerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanDeTrabajoRoutingModule {
}
