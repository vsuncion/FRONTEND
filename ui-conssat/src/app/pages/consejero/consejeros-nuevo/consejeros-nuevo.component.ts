import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { saveConfig } from '../../../services/sweetAlertConfig';
import { ConsejerosService } from 'src/app/services/consejeros.service';
import { ConsejeroResponse, ProfesionResponse } from 'src/app/dto/response/Consejero.response';
import { DatePipe } from '@angular/common';
import { FijasService } from 'src/app/services/fijas.service';
import { TipoDocumentoResponse } from 'src/app/dto/response/RegistrarInvitado.response';
import { EntidadAcuerdoActaResponse } from 'src/app/dto/response/AcuerdoActaSesion.response';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-consejeros-nuevo',
  templateUrl: './consejeros-nuevo.component.html',
  styleUrls: ['./consejeros-nuevo.component.scss']
})
export class ConsejerosNuevoComponent implements OnInit {

  documentosTipo = [];

  entidades = [];
  profesiones = [];

  private selectedfile: File;
  consejeroForm: FormGroup;

  constructor(private fb: FormBuilder, private spinnerService: NgxSpinnerService, private router: Router,
              @Inject(ConsejerosService) private consejerosService: ConsejerosService,
              @Inject(FijasService) private fijasService: FijasService,
              private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      // INICIA EL FORMUALRIO AQUI
    }, 800);

    this.consejeroForm = this.fb.group({
      numeroDocumento: ['', Validators.required],
      tipoDocumento: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      //profesion: ['', Validators.required],
      email: ['', Validators.required],
      email2: [''],
      entidad: ['', Validators.required],
      tipo: [''],
      fechaInicio: ['', Validators.required],
      fechaFin: [''],
      documentoDesginado: [''],
      adjunto: [''],
    });
    this.listarDocumentos();
    this.listarEntidades();
    //this.listarProfesiones();
    this.verificarcookies();
  }

  listarDocumentos() {
    this.fijasService.listarTipoDocumento().subscribe(
      (data: TipoDocumentoResponse[]) => {
        console.log(data);
        this.documentosTipo = data;
        // this.consejeroForm.get('tipoDocumento').setValue(this.documentosTipo[0].tPdocumentoidpk);
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
        // this.consejeroForm.get('entidad').setValue(this.entidades[0].eNtidadidpk);
      },
      error => {
        console.log(error);
      }
    );
  }

  listarProfesiones() {
    this.fijasService.listarProfesiones().subscribe(
      (data: ProfesionResponse[]) => {
        console.log(data);
        this.profesiones = data;
        // this.consejeroForm.get('profesion').setValue(this.profesiones[0].pRofesionidpk);
      },
      error => {
        console.log(error);
      }
    );
  }

  guardar() {
    const formData = new FormData();
    formData.append('docaprob', this.selectedfile);
    formData.append('rEgionfk', Cookie.get('inforegioncodigo'));
    formData.append('cOnsejofk', '');
    formData.append('cOmisionfk', '');
    formData.append('vTipdocumento', this.consejeroForm.get('tipoDocumento').value);
    formData.append('vNumdocumento', this.consejeroForm.get('numeroDocumento').value);
    formData.append('vDesnombre', this.consejeroForm.get('nombres').value);
    formData.append('vDesappaterno', this.consejeroForm.get('apellidoPaterno').value);
    formData.append('vDesapmaterno', this.consejeroForm.get('apellidoMaterno').value);
    //formData.append('vProfesion', this.consejeroForm.get('profesion').value);
    formData.append('vDesemail1', this.consejeroForm.get('email').value);
    formData.append('vDesemail2', this.consejeroForm.get('email2').value);
    formData.append('vEntidad', this.consejeroForm.get('entidad').value);
    formData.append('vTpconsejero', this.consejeroForm.get('tipo').value);
    formData.append('dFecinicio', this.datePipe.transform(this.consejeroForm.get('fechaInicio').value, 'dd-MM-yyyy'));
    formData.append('dFecfin', this.datePipe.transform(this.consejeroForm.get('fechaFin').value, 'dd-MM-yyyy'));
    formData.append('vNumdocasig', this.consejeroForm.get('documentoDesginado').value);

    this.spinnerService.show();
    console.log('FORM DATA');
    console.log(formData);
    this.consejerosService.registrarConsejeros(formData).subscribe(
      (data: ConsejeroResponse) => {
        console.log(data);
        setTimeout(() => {
          this.spinnerService.hide();
          Swal.fire(saveConfig).then((result) => {
            this.router.navigate(['/panel/consejeros']);
          });
        }, 800);
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
    this.router.navigate(['/panel/consejeros']);

  }

  selectedFile(event) {
    this.selectedfile = event.target.files[0];
  }
  verificarcookies() {
    if (!Cookie.get('inforegioncodigo') ) {
      this.router.navigate(['/login']);
    }
  }
}
