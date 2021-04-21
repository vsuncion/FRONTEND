import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: './pages/autenticacion/autenticacion.module#AutenticacionModule',
  },
  {
    path: 'panel',
    loadChildren: './pages/panel/panel.module#PanelModule',
  },
  {
    path: '**',
    redirectTo: 'sesion/404'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [
    RouterModule
  ],
  declarations: [],
})
export class AppRoutingModule {
}
