import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoletinesComponent } from './boletines/boletines.component';
import { BoletinesNuevoComponent } from './boletines-nuevo/boletines-nuevo.component';
import { BoletinesEditarComponent } from './boletines-editar/boletines-editar.component';
import { BoletinesVerComponent } from './boletines-ver/boletines-ver.component';


const routes: Routes = [
  { path: '', component: BoletinesComponent },
  { path: 'nuevo', component: BoletinesNuevoComponent },
  { path: 'editar/:id', component: BoletinesEditarComponent },
  { path: 'ver/:id', component: BoletinesVerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoletinRoutingModule {
}
