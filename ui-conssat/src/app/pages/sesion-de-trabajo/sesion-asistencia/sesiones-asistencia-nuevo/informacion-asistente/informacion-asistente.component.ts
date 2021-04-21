import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ActualizarInvitadoResponse } from 'src/app/dto/response/ActualizarInvitado.response';
import { SesionTrabajoService } from 'src/app/services/sesion-trabajo.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { editConfig } from 'src/app/services/sweetAlertConfig';
import { Router } from '@angular/router';
import { AsistenciaSesionTrabajoResponse } from 'src/app/dto/response/AsistenciaSesionTrabajo.response';

@Component({
  selector: 'app-informacion-asistente',
  templateUrl: './informacion-asistente.component.html',
  styleUrls: ['./informacion-asistente.component.scss']
})
export class InformacionAsistenteComponent implements OnInit {

  constructor(private fb: FormBuilder, private spinnerService: NgxSpinnerService, private router: Router,
              @Inject(MAT_DIALOG_DATA) public data: AsistenciaSesionTrabajoResponse,
              @Inject(SesionTrabajoService) private sesionTrabajoService: SesionTrabajoService,
              private dialogRef: MatDialogRef<InformacionAsistenteComponent>) { }

  informacionAsistenteForm: FormGroup;

  ngOnInit() {

    this.informacionAsistenteForm = this.fb.group({
      apellidoNombre: [this.data.apellidosNombre, Validators.required],
      numeroDocumento: [this.data.numeroDocumento, Validators.required],
      asistencia: [parseInt(this.data.asistio), []],
      horaInicio: [this.data.horaEntrada, Validators.required],
      horaTermino: [this.data.horaSalida, Validators.required],
    });
  }

  actualizar() {
    let formData = new FormData();
    formData.append('idAsistencia', this.data.idAsistencia + '');
    formData.append('horaEntrada', this.informacionAsistenteForm.get('horaInicio').value);
    formData.append('horaSalida', this.informacionAsistenteForm.get('horaTermino').value);
    formData.append('asistio', this.informacionAsistenteForm.get('asistencia').value ? '1' : '0');
    this.sesionTrabajoService.actualizarAsistente(formData).subscribe(
      (data: ActualizarInvitadoResponse) => {
        console.log(data);
        this.spinnerService.show();
        setTimeout(() => {
          this.spinnerService.hide();
          Swal.fire(editConfig).then((result) => {
            this.dialogRef.close(1);
          });
        }, 800);
      }, error => {
        console.log(error);
      }
    );
  }

  cancelar() {
    this.dialogRef.close(0);
  }

}
