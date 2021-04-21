import { Component, OnInit, Inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InformesGestionService } from 'src/app/services/informes- gestion.service';
import { SesionTrabajoResponse } from 'src/app/dto/response/SesionTrabajo.response';
import { SesionTrabajoService } from 'src/app/services/sesion-trabajo.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-buscar-nro-sesion',
  templateUrl: './buscar-nro-sesion.component.html',
  styleUrls: ['./buscar-nro-sesion.component.scss']
})
export class BuscarNroSesionComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<BuscarNroSesionComponent>,
              private spinnerService: NgxSpinnerService,
              @Inject(InformesGestionService) private informesGestionService: InformesGestionService) { }

  informesAnualesForm: FormGroup;
  dataSource = [];

  displayedColumns: string[] = ['item', 'sesion', 'horaInicio', 'horaFin', 'fecha'];

  ngOnInit() {

    this.informesAnualesForm = this.fb.group({
      nroSesion: ['', Validators.required],

    });

  }

  buscarSesion() {
    // busquedaForm
    this.spinnerService.show();
    console.log('buscar numero sesion');
    let formData = new FormData();
    formData.append('nombresesion', this.informesAnualesForm.get('nroSesion').value);


    this.informesGestionService.buscarSesion(formData).subscribe(
      (data: SesionTrabajoResponse[]) => {
        console.log(data);
        this.spinnerService.hide();
        this.dataSource = data;
      }, error => {
        console.log(error);
        this.spinnerService.hide();
      }
    );

  }

  seleccion(obj: SesionTrabajoResponse) {
    this.dialogRef.close(obj);
  }

  cancelar() {
    this.dialogRef.close();
  }

}
