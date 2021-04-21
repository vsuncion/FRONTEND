import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RegistrarParticipanteCalendarioRequest } from 'src/app/dto/request/RegistrarParticCalendario.request';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { CalendarioActividadesService } from 'src/app/services/calendarioActividades.service';
import { CalendarioParticipanteResponse } from 'src/app/dto/response/CalendadrioParticipante.response';
import Swal from 'sweetalert2';
import { saveConfig } from 'src/app/services/sweetAlertConfig';
import { FijasService } from 'src/app/services/fijas.service';
import { TipoDocumentoResponse } from 'src/app/dto/response/RegistrarInvitado.response';
import { EntidadAcuerdoActaResponse } from 'src/app/dto/response/AcuerdoActaSesion.response';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-agregar-participante',
  templateUrl: './agregar-participante.component.html',
  styleUrls: ['./agregar-participante.component.scss']
})
export class AgregarParticipanteComponent implements OnInit {

  participantesForm: FormGroup;

  documentosTipo = [];
  entidades = [];

  constructor(private fb: FormBuilder, private router: Router, private datePipe: DatePipe,
              private dialogRef: MatDialogRef<AgregarParticipanteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private spinnerService: NgxSpinnerService,
              @Inject(FijasService) private fijasService: FijasService,
              @Inject(CalendarioActividadesService) private calendarioActividadesService: CalendarioActividadesService) { }

  ngOnInit() {
    this.participantesForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      tipoDocumento: ['', Validators.required],
      numeroDocumento: ['', Validators.required],
      entidad: ['', Validators.required],
      email: ['', Validators.required],
      fechaActividad: ['', Validators.required],
      comision: ['']
    });

    this.listarDocumentos();
    this.listarEntidades();
  }

  guardar() {
    const req = new RegistrarParticipanteCalendarioRequest();
    req.nCalendiariofk = this.data.idSesion;
    req.vNombre = this.participantesForm.get('nombres').value;
    req.vApellidoPaterno = this.participantesForm.get('apellidoPaterno').value;
    req.vApellidoMaterno = this.participantesForm.get('apellidoMaterno').value;
    req.nTipodocumento = this.participantesForm.get('tipoDocumento').value;
    req.vNumerodocumento = this.participantesForm.get('numeroDocumento').value;
    req.nEntidad = this.participantesForm.get('entidad').value;
    req.vCorreo = this.participantesForm.get('email').value;
    req.dFecactividad = this.datePipe.transform(this.participantesForm.get('fechaActividad').value, 'dd-MM-yyyy');
    req.comision = '';

    this.spinnerService.show();
    this.calendarioActividadesService.registrarParticipantesCalendario(req).subscribe(
      (data: CalendarioParticipanteResponse) => {
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

  cancelar() {
    this.dialogRef.close(0);

  }

  listarDocumentos() {
    this.fijasService.listarTipoDocumento().subscribe(
      (data: TipoDocumentoResponse[]) => {
        console.log(data);
        this.documentosTipo = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  listarEntidades() {
    this.fijasService.listarEntidades().subscribe(
      (data: EntidadAcuerdoActaResponse[]) => {
        console.log(data);
        this.entidades = data;
      },
      error => {
        console.log(error);
      }
    );
  }
  verificarrol() {
    if (Cookie.get('idrol') === 'ROLE_OPECONSSAT' || Cookie.get('idrol') === 'ROLE_OPECORSSAT') {
      return true;
    } else {
      return false;
    }
  }
}
