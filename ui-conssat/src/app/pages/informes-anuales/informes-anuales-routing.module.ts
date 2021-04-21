import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InformesAnualesComponent } from './informes-anuales/informes-anuales.component';
import { InformesAnualesNuevoComponent } from './informes-anuales-nuevo/informes-anuales-nuevo.component';
import { InformesAnualesEditarComponent } from './informes-anuales-editar/informes-anuales-editar.component';
import { InformesAnualesVerComponent } from './informes-anuales-ver/informes-anuales-ver.component';

const routes: Routes = [
  { path: '', component: InformesAnualesComponent },
  { path: 'nuevo', component: InformesAnualesNuevoComponent },
  { path: 'editar/:id', component: InformesAnualesEditarComponent },
  { path: 'ver/:id', component: InformesAnualesVerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformesAnualesRoutingModule {
}
