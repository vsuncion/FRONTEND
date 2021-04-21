import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { CustomMaterialModule } from 'src/app/core/material.module';
import { AutenticacionRoutingModule } from './autenticacion-routing.module';
import { SharedModule } from 'src/app/core/shared.module';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AutenticacionRoutingModule,
    SharedModule,
    CustomMaterialModule,
  ],
  providers:[
    // AutenticacionService
  ]
})
export class AutenticacionModule { }
