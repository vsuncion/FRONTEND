import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CorrelativocomisionComponent } from './correlativocomision/correlativocomision.component';
import { CorrelativoscomisionesNuevoComponent } from './correlativoscomisiones-nuevo/correlativoscomisiones-nuevo.component';
import { CorrelativoscomisionesEditarComponent } from './correlativoscomisiones-editar/correlativoscomisiones-editar.component';

const routes: Routes = [
  { path: '', component: CorrelativocomisionComponent } ,
  { path: 'nuevo', component: CorrelativoscomisionesNuevoComponent},
  { path: 'editar/:id',component:CorrelativoscomisionesEditarComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorrelativocomisionroutingModule { }
