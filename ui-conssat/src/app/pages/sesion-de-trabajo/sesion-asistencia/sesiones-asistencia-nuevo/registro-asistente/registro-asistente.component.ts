import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SesionTrabajoService } from 'src/app/services/sesion-trabajo.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { RegistrarInvitadoResponse, TipoDocumentoResponse } from 'src/app/dto/response/RegistrarInvitado.response';
import { saveConfig } from 'src/app/services/sweetAlertConfig';
import Swal from 'sweetalert2';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EntidadAcuerdoActaResponse } from 'src/app/dto/response/AcuerdoActaSesion.response';
import { FijasService } from 'src/app/services/fijas.service';

@Component({
  selector: 'app-registro-asistente',
  templateUrl: './registro-asistente.component.html',
  styleUrls: ['./registro-asistente.component.scss']
})
export class RegistroAsistenteComponent implements OnInit {

  constructor(private fb: FormBuilder, private spinnerService: NgxSpinnerService,
              @Inject(SesionTrabajoService) private sesionTrabajoService: SesionTrabajoService,
              private dialogRef: MatDialogRef<RegistroAsistenteComponent>,
              @Inject(FijasService) private fijasService: FijasService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  sesionDeTrabajoForm: FormGroup;

  entidades = [];
  documentosTipo = [];

  ngOnInit() {
    console.log('este es id enviado de la sesion');
    console.log(this.data);
    // this.spinnerService.show();
    // setTimeout(() => {
    //   this.spinnerService.hide();
    //   // INICIA EL FORMUALRIO AQUI
    // }, 800);

    this.sesionDeTrabajoForm = this.fb.group({
      entidad: ['', Validators.required],
      tipoDocumento: ['', Validators.required],
      numeroDocumento: ['', Validators.required],
      nombre: ['', Validators.required],
      ApellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      nroCelular: ['', Validators.required],
    });

    this.listarEntidades();
    this.listarDocumentos();

  }

  guardar() {
    let formData = new FormData();
    formData.append('sEsionfk', this.data.idSesion);
    formData.append('entidad', this.sesionDeTrabajoForm.get('entidad').value);
    formData.append('tipodocumento', this.sesionDeTrabajoForm.get('tipoDocumento').value);
    formData.append('vNumerodocumento', this.sesionDeTrabajoForm.get('numeroDocumento').value);
    formData.append('vNombre', this.sesionDeTrabajoForm.get('nombre').value);
    formData.append('vApellido_paterno', this.sesionDeTrabajoForm.get('ApellidoPaterno').value);
    formData.append('vApellido_materno', this.sesionDeTrabajoForm.get('apellidoMaterno').value);
    formData.append('vNumerocelular', this.sesionDeTrabajoForm.get('nroCelular').value);


    this.spinnerService.show();
    console.log('FORM DATA');
    console.log(formData);
    this.sesionTrabajoService.registrarAsistente(formData).subscribe(
      (data: RegistrarInvitadoResponse) => {
        console.log(data);

        this.spinnerService.hide();
        Swal.fire(saveConfig).then((result) => {
          // this.router.navigate(['/panel/consejeros']);
          this.dialogRef.close(1);

        });

      }, error => {
        console.log(error);
      }
    );
  }

  cancelar() {
    this.dialogRef.close(0);
  }

  listarEntidades() {
    // LLAMAR A SERVICIO
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

}
