import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendariosEditarComponent } from './calendarios-editar/calendarios-editar.component';
import { CalendariosVerComponent } from './calendarios-ver/calendarios-ver.component';
import { CalendariosNuevoComponent } from './calendarios-nuevo/calendarios-nuevo.component';
import { CalendariosComponent } from './calendarios/calendarios.component';

const routes: Routes = [
  { path: '', component: CalendariosComponent },
  { path: 'nuevo', component: CalendariosNuevoComponent },
  { path: 'editar/:id', component: CalendariosEditarComponent },
  { path: 'ver/:id', component: CalendariosVerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarioRoutingModule {
}
