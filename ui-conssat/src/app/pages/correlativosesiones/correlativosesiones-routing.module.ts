import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CorrelativosesionComponent } from './correlativosesion/correlativosesion.component';
import { CorrelativosesionNuevoComponent } from './correlativosesion-nuevo/correlativosesion-nuevo.component';
import { CorrelativosesionEditarComponent } from './correlativosesion-editar/correlativosesion-editar.component';

const routes: Routes = [
  { path: '', component: CorrelativosesionComponent },
  { path: 'nuevo', component:CorrelativosesionNuevoComponent},
  { path:'editar/:id', component:CorrelativosesionEditarComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  CorrelativosesionesroutingModule { }
