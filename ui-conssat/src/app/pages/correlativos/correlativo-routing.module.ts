import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CorrelativoNuevoComponent } from './correlativo-nuevo/correlativo-nuevo.component';
import { CorrelativoEditarComponent } from './correlativo-editar/correlativo-editar.component';
import { CorrelativoComponent } from './correlativo/correlativo.component';


const routes: Routes = [
  { path: '', component: CorrelativoComponent },
  { path: 'nuevo', component: CorrelativoNuevoComponent },
  { path: 'editar/:id', component: CorrelativoEditarComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorrelativoRoutingModule { }
