import { Component, OnInit, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { editConfig } from '../../../services/sweetAlertConfig';
import { ConsejerosService } from 'src/app/services/consejeros.service';
import { DatePipe } from '@angular/common';
import { ConsejeroResponse } from 'src/app/dto/response/Consejero.response';
import { ConsejeroRequest } from 'src/app/dto/request/Concejero.request';
import { FijasService } from 'src/app/services/fijas.service';
import { TipoDocumentoResponse } from 'src/app/dto/response/RegistrarInvitado.response';
import { EntidadAcuerdoActaResponse } from 'src/app/dto/response/AcuerdoActaSesion.response';
import { EventEmitter } from 'protractor';
import { ComisionesService } from 'src/app/services/comisiones.service';
import { ComisionConsejoResponse } from 'src/app/dto/response/ComisionConsejo.response';
import { HttpResponse } from '@angular/common/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-comision-integrantes-ver',
  templateUrl: './comision-integrantes-ver.component.html',
  styleUrls: ['./comision-integrantes-ver.component.scss']
})
export class ComisionIntegrantesVerComponent implements OnInit {
  private sub: any;
  id: number;
  idIntegrante: number;

  concejero: ConsejeroResponse;

  documentosTipo = [];

  entidades = [];

  private selectedfile: File;
  consejeroForm: FormGroup;

  // @Output()
  // cancelarEmit = new EventEmitter();

  constructor(private fb: FormBuilder, private spinnerService: NgxSpinnerService, private router: Router,
              private route: ActivatedRoute,
              @Inject(ConsejerosService) private consejerosService: ConsejerosService,
              @Inject(FijasService) private fijasService: FijasService,
              private datePipe: DatePipe,
              @Inject(ComisionesService) private comisionesService: ComisionesService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.idIntegrante = +params['idIntegrante'];
    });

    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      this.consejeroForm.disable();
      // INICIA EL FORMUALRIO AQUI
    }, 800);

    this.consejeroForm = this.fb.group({
      numeroDocumento: ['', Validators.required],
      vtipoDocumento: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      //profesion: [''],
      email: ['', Validators.required],
      email2: [''],
      entidad: [''],
      tipo: [''],
      fechaInicio: ['', Validators.required],
      fechaFin: [''],
      documentoDesginado: [''],
      adjunto: ['']
    });

    this.obtenerIntegrante();
    this.verificarcookies();
  }

  obtenerIntegrante() {
    this.comisionesService.buscarIntegrantePorId(this.idIntegrante).subscribe(
      (data: ComisionConsejoResponse) => {
        console.log('BUSQUEDA POR ID');
        console.log(data);
        this.consejeroForm.setValue({
          numeroDocumento: data.consejero.vNumdocumento,
          vtipoDocumento: data.consejero.tipodocumento.vDesabreviado,
          nombres: data.consejero.vDesnombre,
          apellidoPaterno: data.consejero.vDesappaterno,
          apellidoMaterno: data.consejero.vDesapmaterno,
          //profesion: data.consejero.profesion.vDescripcion,
          email: data.consejero.vDesemail1,
          email2: data.consejero.vDesemail2,
          entidad: data.consejero.entidad.vDesnombre,
          tipo: data.tipoconsejero.tPconsejeroidpk + '',
          fechaInicio: data.dFecinicio ? new Date(data.dFecinicio.toString().replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3')) : '',
          fechaFin: data.dFecfin ? new Date(data.dFecfin.toString().replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3')) : '',
          documentoDesginado: data.vNumdocumento,
          adjunto: '',
        });
        this.spinnerService.hide();
      }, error => {
        console.log(error);
        this.spinnerService.hide();
      }
    );
  }

  cancelar() {
    this.router.navigate([`/panel/comisiones/${this.id}/integrantes`]);

  }

  decargarArchivo() {
    this.spinnerService.show();
    this.comisionesService.descargarDocIntegrante(this.idIntegrante).subscribe(
      (data: HttpResponse<Blob>) => {
        this.spinnerService.hide();
        this.comisionesService.descargarArchivo(data.body);
      }, error => {
        console.log(error);
      }
    );
  }

  verificarcookies() {
    if (!Cookie.get('inforegioncodigo') ) {
      this.router.navigate(['/login']);
    }
  }

}
