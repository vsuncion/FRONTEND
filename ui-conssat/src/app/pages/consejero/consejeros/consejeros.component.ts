import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { deleteConfig } from '../../../services/sweetAlertConfig';
import { ConsejerosService } from 'src/app/services/consejeros.service';
import { Inject } from '@angular/core';
import { ConsejeroResponse } from 'src/app/dto/response/Consejero.response';
import { BuscarConsejeroRequest } from 'src/app/dto/request/BuscarCosejero.request';
import { FijasService } from 'src/app/services/fijas.service';
import { TipoDocumentoResponse } from 'src/app/dto/response/RegistrarInvitado.response';
import { EntidadAcuerdoActaResponse } from 'src/app/dto/response/AcuerdoActaSesion.response';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-consejeros',
  templateUrl: './consejeros.component.html',
  styleUrls: ['./consejeros.component.scss']
})
export class ConsejerosComponent implements OnInit {

  const;

  documentosTipo = [];

  entidades = [];

  busquedaForm: FormGroup;

  listaConcejeros = [];
  dataSource: MatTableDataSource<any> = null;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  displayedColumns: string[] = ['nro', 'tipo', 'numero', 'nombres', 'apellidoPaterno', 'apellidoMaterno', 'entidad', 'documentoDesignado', 'fecha', 'ver', 'editar', 'eliminar'];

  constructor(private fb: FormBuilder, private spinnerService: NgxSpinnerService,
              private router: Router,
              @Inject(ConsejerosService) private consejerosService: ConsejerosService,
              @Inject(FijasService) private fijasService: FijasService,
              private validationService: ValidationService) {
  }

  ngOnInit() {

    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      // INICIA EL FORMUALRIO AQUI
    }, 800);

    this.busquedaForm = this.fb.group({
      numeroDocumento: [''],
      tipoDocumento: [''],
      nombres: [''],
      apellidoPaterno: [''],
      apellidoMaterno: [''],
      profesion: [''],
      email: [''],
      email2: [''],
      entidad: [''],
      tipo: [''],
      fechaInicio: [''],
      fechaFin: [''],
      documentoDesginacion: [''],
      adjunto: [''],
    });

    this.listarEntidades();
    this.listarDocumentos();
    this.listarConsejeros();
    this.verificarcookies();
  }

  public cargarDatosTabla(): void {
    if (this.listaConcejeros.length > 0) {
      this.dataSource = new MatTableDataSource(this.listaConcejeros);
      this.dataSource.paginator = this.paginator;
    } else {
      this.listaConcejeros = [];
      this.dataSource = new MatTableDataSource(this.listaConcejeros);
      this.dataSource.paginator = this.paginator;
    }
  }

  listarConsejeros() {
    this.consejerosService.listarConsejeros().subscribe(
      (data: ConsejeroResponse[]) => {
        console.log(data);
        this.listaConcejeros = data;
        this.cargarDatosTabla();
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

  buscarConsejeros() {
    // busquedaForm
    console.log('hola');
    let req = new BuscarConsejeroRequest();
    req.rEgionfk = 14;
    req.cOnsejofk = 1;
    req.vNumdocasig = this.busquedaForm.get('documentoDesginacion').value;
    req.dFecinicio = this.busquedaForm.get('fechaInicio').value;
    req.dFecfin = this.busquedaForm.get('fechaFin').value;
    req.vTipdocumento = this.busquedaForm.get('tipoDocumento').value;
    req.vNumdocumento = this.busquedaForm.get('numeroDocumento').value;
    req.vDesnombre = this.busquedaForm.get('nombres').value;
    req.vDesappaterno = this.busquedaForm.get('apellidoPaterno').value;
    req.vDesapmaterno = this.busquedaForm.get('apellidoMaterno').value;
    req.vEntidad = this.busquedaForm.get('entidad').value;
    console.log(req);

    this.consejerosService.buscarConsejeros(req).subscribe(
      (data: ConsejeroResponse[]) => {
        console.log(data);
        this.listaConcejeros = data;
        this.cargarDatosTabla();
      },
      error => {
        console.log(error);
      }
    );

  }

  verRegistro(id: any) {
    this.router.navigate(['/panel/consejeros/ver/', id]);
  }

  editarRegistro(id: any) {
    this.router.navigate(['/panel/consejeros/editar/', id]);
  }

  eliminarRegistro(id: any) {
    this.spinnerService.show();

    this.consejerosService.eliminarConsejeros(id).subscribe(
      (data: ConsejeroResponse) => {
        console.log(data);
        setTimeout(() => {
          this.spinnerService.hide();
          Swal.fire(deleteConfig);
          this.listarConsejeros();
        }, 800);
      },
      error => {
        console.log(error);
      }
    );
  }

  nuevoRegistro() {
    this.router.navigate(['/panel/consejeros/nuevo']);
  }
  verificarcookies() {
    if (!Cookie.get('inforegioncodigo')) {
      this.router.navigate(['/login']);
    }
  }

  limpiarRegistro() {
    this.validationService.setAsUntoched(this.busquedaForm);
  }

}
