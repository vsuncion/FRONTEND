import { Component, OnInit, ViewChildren, Inject } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MaterialTablePaginator } from 'src/app/core/material.table.paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { EncargadoRegionService } from 'src/app/services/encargadoRegion.service';
import Swal from 'sweetalert2';
import { saveConfig } from 'src/app/services/sweetAlertConfig';
import { EncargadoRegionResponse } from 'src/app/dto/response/EncargadoRegion.response';
import { FijasService } from 'src/app/services/fijas.service';
import { RegionResponse } from 'src/app/dto/response/Boletin.response';
import { EntidadAcuerdoActaResponse } from 'src/app/dto/response/AcuerdoActaSesion.response';
import { TipoDocumentoResponse } from 'src/app/dto/response/RegistrarInvitado.response';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-region-nuevo',
  templateUrl: './region-nuevo.component.html',
  styleUrls: ['./region-nuevo.component.scss']
})
export class RegionNuevoComponent implements OnInit {
  regiones = [];
  entidades = [];
  documentosTipo = [];
  private archivoAdjunto: File;
  busquedaForm: FormGroup;
  constructor(private fb: FormBuilder, private spinnerService: NgxSpinnerService, private router: Router,
              private datePipe: DatePipe,
              @Inject(EncargadoRegionService) private encargadoRegionService: EncargadoRegionService,
              @Inject(FijasService) private fijasService: FijasService) { }

  ngOnInit() {
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

    this.listarRegionesPais();
    this.listarEntidades();
    this.listarDocumentos();
    this.verificarcookies();
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

    this.spinnerService.show();
    this.encargadoRegionService.registrarRegion(formData).subscribe(
      (data: EncargadoRegionResponse) => {
        console.log(data);
        setTimeout(() => {
          this.spinnerService.hide();
          Swal.fire(saveConfig).then((result) => {
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



  cancelar() {
    this.router.navigate(['/panel/regiones']);

  }

  selectedFileDocAprobacion($event) {
    this.archivoAdjunto = $event.target.files[0];
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
  verificarcookies() {
    if (!Cookie.get('inforegioncodigo') ) {
      this.router.navigate(['/login']);
    }
  }

}
