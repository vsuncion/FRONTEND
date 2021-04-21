import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsejerosComponent } from './consejeros/consejeros.component';
import { ConsejerosNuevoComponent } from './consejeros-nuevo/consejeros-nuevo.component';
import { ConsejerosEditarComponent } from './consejeros-editar/consejeros-editar.component';
import { ConsejerosVerComponent } from './consejeros-ver/consejeros-ver.component';


const routes: Routes = [
  { path: '', component: ConsejerosComponent },
  { path: 'nuevo', component: ConsejerosNuevoComponent },
  { path: 'editar/:id', component: ConsejerosEditarComponent },
  { path: 'ver/:id', component: ConsejerosVerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsejeroRoutingModule { }
