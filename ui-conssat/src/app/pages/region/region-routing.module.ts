import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegionesComponent } from './regiones/regiones.component';
import { RegionNuevoComponent } from './region-nuevo/region-nuevo.component';
import { RegionEditarComponent } from './region-editar/region-editar.component';


const routes: Routes = [
  { path: '', component: RegionesComponent },
  { path: 'nuevo', component: RegionNuevoComponent },
  { path: 'editar/:id', component: RegionEditarComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegionRoutingModule { }
