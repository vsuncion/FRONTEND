import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';

const sesionRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: LoginComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(sesionRoutes)],
  exports: [RouterModule]
})
export class AutenticacionRoutingModule { }
