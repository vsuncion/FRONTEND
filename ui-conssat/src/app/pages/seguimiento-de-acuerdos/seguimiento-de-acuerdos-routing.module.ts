import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SeguimientoActaComponent } from './seguimiento-acta/seguimiento-acta.component';
import { SeguimientoAcuerdosPorActaComponent } from './seguimiento-acuerdos-por-acta/seguimiento-acuerdos-por-acta.component';
import { SeguimientoComponent } from './seguimiento/seguimiento.component';

const routes: Routes = [
  { path: '', component: SeguimientoComponent },
  { path: ':idSesion/acta/:idActa/acuerdo/:idAcuerdo/accion/nuevo', component: SeguimientoActaComponent },
  { path: ':idSesion/acta/:idActa/acuerdos', component: SeguimientoAcuerdosPorActaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguimientoDeAcuerdosRoutingModule {
}
