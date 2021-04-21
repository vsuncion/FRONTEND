import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UppercasedDirective } from './directives/uppercased.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';



@NgModule({
  declarations: [
    UppercasedDirective,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialFileInputModule,
    NgxMaterialTimepickerModule,
    SweetAlert2Module,
  ],
  exports: [
    UppercasedDirective,

    ReactiveFormsModule,
    MaterialFileInputModule,
    NgxMaterialTimepickerModule,
    SweetAlert2Module,
  ]
})
export class SharedModule { }
