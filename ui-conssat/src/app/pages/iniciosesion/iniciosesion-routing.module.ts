import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { PanelComponent } from '../panel/panel.component';
import { IniciosesionesComponent } from './iniciosesiones/iniciosesiones.component';
import { IniciosesionNuevoComponent } from './iniciosesion-nuevo/iniciosesion-nuevo.component';
import { IniciosesionEditarComponent } from './iniciosesion-editar/iniciosesion-editar.component';
import { IniciosesionRolComponent } from './iniciosesion-rol/iniciosesion-rol.component';


const routes: Routes = [
  { path: '', component: IniciosesionesComponent },
  { path: 'nuevo', component: IniciosesionNuevoComponent },
  { path: 'editar/:id', component: IniciosesionEditarComponent },
  { path: 'rol/:id', component: IniciosesionRolComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IniciosesionRoutingModule { }
