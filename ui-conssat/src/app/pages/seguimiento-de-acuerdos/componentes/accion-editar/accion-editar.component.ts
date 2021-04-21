import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EntidadAcuerdoActaResponse } from 'src/app/dto/response/AcuerdoActaSesion.response';
import { FijasService } from 'src/app/services/fijas.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SeguimientoAcuerdoService } from 'src/app/services/seguimiento-acuerdo.service';
import { saveConfig } from 'src/app/services/sweetAlertConfig';

@Component({
  selector: 'app-accion-editar',
  templateUrl: './accion-editar.component.html',
  styleUrls: ['./accion-editar.component.scss']
})
export class AccionEditarComponent implements OnInit {
  private archivoAdjunto: File;

  entidades = [];

  accionEditarForm: FormGroup;

  constructor(private fb: FormBuilder, private spinner: NgxSpinnerService, private spinnerService: NgxSpinnerService,
              private datePipe: DatePipe, private router: Router, private route: ActivatedRoute,
              @Inject(FijasService) private fijasService: FijasService,
              @Inject(SeguimientoAcuerdoService) private seguimientoAcuerdoService: SeguimientoAcuerdoService,
              @Inject(MAT_DIALOG_DATA) private data: any,
              private dialogRef: MatDialogRef<AccionEditarComponent>
  ) { }

  ngOnInit() {
    console.log(this.data);

    this.accionEditarForm = this.fb.group({
      codigo: [{ value: '', disabled: true }, Validators.required],
      accionDescripcion: ['', Validators.required],
      responsable: ['', Validators.required],
      entidad: ['', Validators.required],
      fechaEjecutara: ['', Validators.required],
      fueEjecutado: [''],
      fechaEjecuto: [''],
      adjunto: ['']
    });
    this.listarEntidades();
    this.cargarDatosAccion();
  }


  cargarDatosAccion(): void {
    this.seguimientoAcuerdoService.buscarAccionPorId(this.data.idAccion).subscribe(
      (data: any) => {
        console.log(data);
        this.accionEditarForm.setValue({
          codigo: data.aCcionesidpk,
          accionDescripcion: data.vDesaccion,
          responsable: data.vResponsable,
          entidad: data.entidad.eNtidadidpk,
          fechaEjecutara: new Date(data.dFecejecutara.toString().replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3')),
          fueEjecutado: data.cFlgejecuto === '0' ? false : true,
          // fechaEjecuto: new Date(data.dFecejecuto.toString().replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3')),
          fechaEjecuto: data.dFecejecuto === null ? null :  new Date(data.dFecejecuto.toString().replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3')),
          adjunto: data.vNombrearchivo + '' + data.vExtarchivo
        });
      }, error => {
        console.log(error);
      }
    );
  }

  guardar() {
    const formData = new FormData();
    formData.append('idaccion', this.data.idAccion + '');
    formData.append('identidad', this.accionEditarForm.get('entidad').value);
    formData.append('responsable', this.accionEditarForm.get('responsable').value);
    formData.append('descripcionaccion', this.accionEditarForm.get('accionDescripcion').value);
    formData.append('fecha_ejecutara', this.datePipe.transform(this.accionEditarForm.get('fechaEjecutara').value, 'dd-MM-yyyy'));
    formData.append('fecha_ejecuto', this.datePipe.transform(this.accionEditarForm.get('fechaEjecuto').value, 'dd-MM-yyyy'));
    formData.append('docaccion', this.archivoAdjunto);
    formData.append('flgejecuto', this.accionEditarForm.get('fueEjecutado').value === true ? 1 + '' : 0 + '');


    this.spinnerService.show();
    this.seguimientoAcuerdoService.actualizarAccionRealizada(formData).subscribe(
      (data: any) => {
        console.log(data);
        this.spinnerService.hide();
        Swal.fire(saveConfig).then((result) => {
          this.dialogRef.close(1);
        });
      }, error => {
        console.log(error);
        this.spinnerService.hide();
        Swal.fire({
          icon: 'error',
          title: error.error.error,
          text: error.error.message
        });
      }
    );
  }

  selectedFileDocAprobacion($event) {
    this.archivoAdjunto = $event.target.files[0];
  }

  listarEntidades() {
    // LLAMAR A SERVICIO

    console.log('este esta llamando');
    this.fijasService.listarEntidades().subscribe(
      (data: EntidadAcuerdoActaResponse[]) => {
        console.log(data);
        this.entidades = data;

      },
      error => {
        console.log(error);
      }
    );

    // dataSource
  }

}
