import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PanelComponent } from './panel.component';
import { HomeComponent } from '../home/home.component';


const routes: Routes = [
  {
    path: '',
    component: PanelComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'seguridad',
        loadChildren: '../../pages/iniciosesion/iniciosesion.module#IniciosesionModule',
      },
      {
        path: 'regiones',
        loadChildren: '../../pages/region/region.module#RegionModule',
      },
      {
        path: 'comisiones',
        loadChildren: '../../pages/comision/comision.module#ComisionModule',
      },
      {
        path: 'consejeros',
        loadChildren: '../../pages/consejero/consejero.module#ConsejeroModule',
      },
      {
        path: 'planes-de-trabajo',
        loadChildren: '../../pages/plan-de-trabajo/plan-de-trabajo.module#PlanDeTrabajoModule',
      },
      {
        path: 'sesiones-de-trabajo',
        loadChildren: '../../pages/sesion-de-trabajo/sesion-de-trabajo.module#SesionDeTrabajoModule',
      },
      {
        path: 'seguimiento-de-acuerdos',
        loadChildren: '../../pages/seguimiento-de-acuerdos/seguimiento-de-acuerdos.module#SeguimientoDeAcuerdosModule',
      },
      {
        path: 'boletines',
        loadChildren: '../../pages/boletin/boletin.module#BoletinModule',
      },
      {
        path: 'calendarios',
        loadChildren: '../../pages/calendario/calendario.module#CalendarioModule',
      },
      {
        path: 'informes-anuales',
        loadChildren: '../../pages/informes-anuales/informes-anuales.module#InformesAnualesModule',
      },
      {
        path: 'correlativos',
        loadChildren: '../../pages/correlativos/correlativo.module#CorrelativoModule',
      },
      {
        path: 'correlativosesion',
        loadChildren: '../../pages/correlativosesiones/correlativosesiones.module#CorrelativosesionesModule',
      },
      {
        path: 'correlativoscomision',
        loadChildren: '../../pages/correlativoscomisiones/correlativocomisiones.module#CorrelativocomisionesModule',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule { }
