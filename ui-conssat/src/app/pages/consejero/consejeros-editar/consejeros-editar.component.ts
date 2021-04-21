import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { editConfig } from '../../../services/sweetAlertConfig';
import { ConsejerosService } from 'src/app/services/consejeros.service';
import { DatePipe } from '@angular/common';
import { ConsejeroResponse, ProfesionResponse } from 'src/app/dto/response/Consejero.response';
import { ConsejeroRequest } from 'src/app/dto/request/Concejero.request';
import { FijasService } from 'src/app/services/fijas.service';
import { TipoDocumentoResponse } from 'src/app/dto/response/RegistrarInvitado.response';
import { EntidadAcuerdoActaResponse } from 'src/app/dto/response/AcuerdoActaSesion.response';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-consejeros-editar',
  templateUrl: './consejeros-editar.component.html',
  styleUrls: ['./consejeros-editar.component.scss']
})
export class ConsejerosEditarComponent implements OnInit {
  private sub: any;
  id: number;
  concejero: ConsejeroResponse;

  documentosTipo = [];

  entidades = [];
  profesiones = [];

  private selectedfile: File;
  consejeroForm: FormGroup;

  constructor(private fb: FormBuilder, private spinnerService: NgxSpinnerService, private router: Router,
              private route: ActivatedRoute,
              @Inject(ConsejerosService) private consejerosService: ConsejerosService,
              @Inject(FijasService) private fijasService: FijasService,
              private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params.id;
    });

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
     // profesion: [''],
      email: ['', Validators.required],
      email2: [''],
      entidad: [''],
      tipo: [''],
      fechaInicio: ['', Validators.required],
      fechaFin: [''],
      documentoDesginado: [''],
      adjunto: [''],
    });

    this.listarDocumentos();
    this.listarEntidades();
    //this.listarProfesiones();
    this.obtenerConcejero();
    this.verificarcookies();
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

  obtenerConcejero() {
    this.consejerosService.buscarConsejeroPorId(this.id).subscribe(
      (data: ConsejeroResponse) => {
        this.concejero = data;
        this.consejeroForm.setValue({
          numeroDocumento: data.vNumdocumento,
          tipoDocumento: data.tipodocumento.tPdocumentoidpk,
          nombres: data.vDesnombre,
          apellidoPaterno: data.vDesappaterno,
          apellidoMaterno: data.vDesapmaterno,
         // profesion: data.profesion.pRofesionidpk,
          email: data.vDesemail1,
          email2: data.vDesemail2 ? data.vDesemail2 : '',
          entidad: data.entidad.eNtidadidpk,
          tipo: data.tipoconsejero.tPconsejeroidpk + '',
          fechaInicio: data.dFecinicio ? new Date(data.dFecinicio.toString().replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3')) : '',
          fechaFin: data.dFecfin ? new Date(data.dFecfin.toString().replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3')) : '',
          documentoDesginado: data.vNumdocasig,
          adjunto: data.vNombredocasig + '.' + data.vExtdocasig,
        });
      }, error => {
        this.spinnerService.hide();
        Swal.fire({
          icon: 'error',
          title: error.error.mensaje
        });
      }
    );
  }

  guardar() {
    const formData = new FormData();
    formData.append('cOnsejeroidpk', this.concejero.cOnsejeroidpk + '');
    formData.append('docaprob', this.selectedfile);
    formData.append('rEgionfk', '0');
    formData.append('cOnsejofk', '0');
    formData.append('cOmisionfk', '0');
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
    this.consejerosService.actualizarConsejeros(formData).subscribe(
      (data: ConsejeroResponse) => {
        console.log(data);
        this.spinnerService.show();
        setTimeout(() => {
          this.spinnerService.hide();
          Swal.fire(editConfig).then((result) => {
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

