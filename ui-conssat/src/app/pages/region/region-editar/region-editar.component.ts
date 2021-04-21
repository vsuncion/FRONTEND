import { Component, OnInit, ViewChildren, Inject } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MaterialTablePaginator } from 'src/app/core/material.table.paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { EncargadoRegionService } from 'src/app/services/encargadoRegion.service';
import { EncargadoRegionResponse } from 'src/app/dto/response/EncargadoRegion.response';
import { FijasService } from 'src/app/services/fijas.service';
import { RegionResponse } from 'src/app/dto/response/Boletin.response';
import { EntidadAcuerdoActaResponse } from 'src/app/dto/response/AcuerdoActaSesion.response';
import { TipoDocumentoResponse } from 'src/app/dto/response/RegistrarInvitado.response';
import { editConfig } from 'src/app/services/sweetAlertConfig';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-region-editar',
  templateUrl: './region-editar.component.html',
  styleUrls: ['./region-editar.component.scss']
})
export class RegionEditarComponent implements OnInit {
  private sub: any;
  id: number;

  regiones = [];
  entidades = [];
  documentosTipo = [];

  busquedaForm: FormGroup;
  encargado: any;
  private archivoAdjunto: File;
  constructor(private fb: FormBuilder, private spinnerService: NgxSpinnerService, private router: Router,
              private route: ActivatedRoute, private datePipe: DatePipe,
              @Inject(EncargadoRegionService) private encargadoRegionService: EncargadoRegionService,
              @Inject(FijasService) private fijasService: FijasService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params.id;
    });

    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      // INICIA EL FORMUALRIO AQUI
    }, 800);

    this.busquedaForm = this.fb.group({
      region: [''],
      entidad: [''],
      nombre: [''],
      apepaterno: [''],
      apematerno: [''],
      celular: [''],
      tpdocumento: [''],
      numdocumento: [''],
      numdocaprobacion: [''],
      fechaDocumento: [''],
      adjunto: [''],
    });

    this.obtenerEncargadoRegion();
    this.listarRegionesPais();
    this.listarEntidades();
    this.listarDocumentos();
    this.verificarcookies();
  }

  obtenerEncargadoRegion() {
    this.encargadoRegionService.buscarEncargadoRegionPorId(this.id).subscribe(
      (data: EncargadoRegionResponse) => {
        console.log('BUSQUEDA POR ID');
        console.log(data);
        this.encargado = data;
        this.busquedaForm.setValue({
          region: data.region.rEgionidpk,
          entidad: data.entidades.eNtidadidpk,
          nombre: data.vNombre,
          apepaterno: data.vApellidopaterno,
          apematerno: data.vApellidomaterno,
          celular: data.vNumerocelular,
          tpdocumento: data.tipoDocumentos.tPdocumentoidpk,
          numdocumento: data.vNumdocumento,
          numdocaprobacion: data.vNumdocaprobacion,
          fechaDocumento: data.dFechaprobacion ? new Date(data.dFechaprobacion.toString().replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3')) : '',
          adjunto: '',
         });
      }, error => {
        console.log(error);
      }
    );
  }

  guardar() {
    const formData = new FormData();
    formData.append('regionpk', this.busquedaForm.get('region').value);
    formData.append('entidad', this.busquedaForm.get('entidad').value);
    formData.append('nombre', this.busquedaForm.get('nombre').value);
    formData.append('apellidopaterno', this.busquedaForm.get('apepaterno').value);
    formData.append('apellidomaterno', this.busquedaForm.get('apematerno').value);
    formData.append('tipodoc', this.busquedaForm.get('tpdocumento').value);
    formData.append('numerodocumento', this.busquedaForm.get('numdocumento').value);
    formData.append('numdocaprobacion', this.busquedaForm.get('numdocaprobacion').value);
    formData.append('numerocelular', this.busquedaForm.get('celular').value);
    formData.append('fechadocaprobacion', this.datePipe.transform(this.busquedaForm.get('fechaDocumento').value, 'dd-MM-yyyy'));
    formData.append('docaprob', this.archivoAdjunto);
    formData.append('eNcargadoregionidpk', this.id + '');

    this.spinnerService.show();
    this.encargadoRegionService.actualizarEncargadoRegion(formData).subscribe(
      (data: EncargadoRegionResponse) => {
        console.log(data);
        setTimeout(() => {
          this.spinnerService.hide();
          Swal.fire(editConfig).then((result) => {
            this.router.navigate(['/panel/regiones']);
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

  listarRegionesPais() {
    // LLAMAR A SERVICIO
    this.fijasService.listarRegiones().subscribe(
      (data: RegionResponse[]) => {
        console.log(data);
        this.regiones = data;
      },
      error => {
        console.log(error);
      }
    );
    // dataSource
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

  selectedFileDocAprobacion($event) {
    this.archivoAdjunto = $event.target.files[0];
  }

  cancelar() {
    this.router.navigate(['/panel/regiones']);

  }
  verificarcookies() {
    if (!Cookie.get('inforegioncodigo') ) {
      this.router.navigate(['/login']);
    }
  }
}
