import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ConsejerosService } from 'src/app/services/consejeros.service';
import { ConsejeroResponse } from 'src/app/dto/response/Consejero.response';
import { DatePipe } from '@angular/common';
import { backendUrl } from 'src/app/common';
import { FijasService } from 'src/app/services/fijas.service';
import { TipoDocumentoResponse } from 'src/app/dto/response/RegistrarInvitado.response';
import { EntidadAcuerdoActaResponse } from 'src/app/dto/response/AcuerdoActaSesion.response';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-consejeros-ver',
  templateUrl: './consejeros-ver.component.html',
  styleUrls: ['./consejeros-ver.component.scss']
})
export class ConsejerosVerComponent implements OnInit {
  private sub: any;
  id: number;

  documentosTipo = [];

  entidades = [];

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
      this.id = +params['id'];
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
      //profesion: [''],
      email: ['', Validators.required],
      email2: [''],
      entidad: [''],
      tipo: [''],
      fechaInicio: ['', Validators.required],
      fechaFin: [''],
      documentoDesginado: [''],
      adjunto: [''],
    });

    this.consejeroForm.disable();

    this.listarDocumentos();
    this.listarEntidades();
    this.verificarcookies();
    setTimeout(() => {
      this.obtenerConcejero();
    }, 1000);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  listarDocumentos() {
    this.fijasService.listarTipoDocumento().subscribe(
      (data: TipoDocumentoResponse[]) => {
        console.log('datos');
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

  obtenerConcejero() {
    this.consejerosService.buscarConsejeroPorId(this.id).subscribe(
      (data: ConsejeroResponse) => {
        console.log('BUSQUEDA POR ID');
        console.log(data);
        this.consejeroForm.setValue({
          numeroDocumento: data.vNumdocumento,
          tipoDocumento: data.tipodocumento.tPdocumentoidpk,
          nombres: data.vDesnombre,
          apellidoPaterno: data.vDesappaterno,
          apellidoMaterno: data.vDesapmaterno,
         // profesion: data.profesion.vDesnombre,
          email: data.vDesemail1,
          email2: data.vDesemail2 ? '' : data.vDesemail2,
          entidad: data.entidad.eNtidadidpk,
          tipo: data.tipoconsejero.tPconsejeroidpk + '',
          fechaInicio: data.dFecinicio ? new Date(data.dFecinicio.toString().replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3')) : '',
          fechaFin: data.dFecfin ? new Date(data.dFecfin.toString().replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3')) : '',
          documentoDesginado: data.vNumdocasig,
          adjunto: data.vNombredocasig + '.' + data.vExtdocasig,
        });
      }, error => {
        console.log(error);
      }
    );
  }

  descargarArchivo() {
    window.open(`${backendUrl}api/consejeros/descargar/${this.id}`, '_blank');
  }

  cancelar() {
    this.router.navigate(['/panel/consejeros']);
  }
  verificarcookies() {
    if (!Cookie.get('inforegioncodigo') ) {
      this.router.navigate(['/login']);
    }
  }
}


