import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { deleteConfig } from '../../../services/sweetAlertConfig';
import { SeguimientoAcuerdoService } from 'src/app/services/seguimiento-acuerdo.service';
import { SeguimientoAcuerdoResponse } from 'src/app/dto/response/SeguimientoAcuerdo.response';
import { SeguimientoAcuerdoRequest } from 'src/app/dto/request/SeguimientoAcuerdo.request';
import { DatePipe } from '@angular/common';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ValidationService } from 'src/app/services/validation.service';

interface SesionRow {

  id: number;
  idSesion: number;
  idActa: number;
  numeroSesion: string;
  tipoSesion: string;
  fechaSesion: string;
  numeroActa: string;
}

@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.scss']
})
export class SeguimientoComponent implements OnInit {

  seguimientoAcuerdosForm: FormGroup;

  const;
  ELEMENT_DATA: SesionRow[] = [
    {
      id: 1000,
      idSesion: 1090,
      idActa: 230,
      numeroSesion: 'SES-0-2020-0001',
      tipoSesion: 'ORDINARIA',
      fechaSesion: '01/02/2020',
      numeroActa: 'ACTA-2000-2020-001',
    },
  ];

  busquedaForm: FormGroup;

  listaSeguimientoAcuerdos = [];
  dataSource: MatTableDataSource<any> = null;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  displayedColumns: string[] = ['nro', 'numeroSesion', 'tipoSesion', 'fechaSesion', 'numeroActa', 'fechaActa', 'seguimiento'];
  sesionesTipo = [
    { codigo: '01', descripcion: 'Ordinaria' },
    { codigo: '02', descripcion: 'Extraordinaria' },
  ];

  constructor(private fb: FormBuilder, private spinnerService: NgxSpinnerService, private router: Router,
              @Inject(SeguimientoAcuerdoService) private seguimientoAcuerdoService: SeguimientoAcuerdoService,
              private datePipe: DatePipe, private validationService: ValidationService) {
  }

  ngOnInit() {

    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      // INICIA EL FORMUALRIO AQUI
    }, 800);

    this.busquedaForm = this.fb.group({
      numeroSesion: [''],
      fechaInicioSesion: [''],
      fechaFinSesion: [''],
      tipoSesion: [''],
    });

    this.seguimientoAcuerdosForm = this.fb.group({
      numeroSesion: ['', Validators.required],
      tipoSesion: ['', Validators.required],
      horaInicio: ['', Validators.required],
      horaTermino: ['', Validators.required],
    });
    this.listarAccion();
    this.verificarcookies();
  }

  public cargarDatosTabla(): void {
    if (this.listaSeguimientoAcuerdos.length > 0) {
      this.dataSource = new MatTableDataSource(this.listaSeguimientoAcuerdos);
      this.dataSource.paginator = this.paginator;
    } else {
      this.listaSeguimientoAcuerdos = [];
      this.dataSource = new MatTableDataSource(this.listaSeguimientoAcuerdos);
      this.dataSource.paginator = this.paginator;
    }
  }

  listarAccion() {
    let obj = { nregion: 14 };
    // LLAMAR A SERVICIO
    this.seguimientoAcuerdoService.listarSeguimientoAcuerdo(obj).subscribe(
      (data: SeguimientoAcuerdoResponse[]) => {
        console.log(data);
        this.listaSeguimientoAcuerdos = data;
        this.cargarDatosTabla();
      },
      error => {
        console.log(error);
      }
    );

    // dataSource
  }

  buscarSeguimientoAcuerdo() {
    // busquedaForm
    this.spinnerService.show();
    console.log('buscar Acuerdo');
    let req = new SeguimientoAcuerdoRequest();
    req.vCodigoSesion = this.busquedaForm.get('numeroSesion').value;
    req.nTipoSesion = this.busquedaForm.get('tipoSesion').value;
    req.vfechaInicio = this.datePipe.transform(this.busquedaForm.get('fechaInicioSesion').value, 'dd-MM-yyyy');
    req.vfechafin = this.datePipe.transform(this.busquedaForm.get('fechaFinSesion').value, 'dd-MM-yyyy');
    console.log(req);

    this.seguimientoAcuerdoService.buscarSeguimientoAcuerdo(req).subscribe(
      (data: SeguimientoAcuerdoResponse[]) => {
        console.log(data);
        this.spinnerService.hide();
        this.listaSeguimientoAcuerdos = data;
        this.cargarDatosTabla();
      }, error => {
        console.log(error);
        this.spinnerService.hide();
      }
    );

  }



  verRegistro(id: any) {
    this.router.navigate(['/panel/sesiones-de-trabajo/ver/' + id]);
  }

  editarRegistro(id: any) {
    this.router.navigate(['/panel/sesiones-de-trabajo/editar/' + id]);
  }

  eliminarRegistro(codigoContrato: any) {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      Swal.fire(deleteConfig);
    }, 800);
  }

  nuevoRegistro() {
    this.router.navigate(['/panel/sesiones-de-trabajo/nuevo']);
  }

  decargarArchivo(archivo: any) {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      Swal.fire({
        title: 'Descarga Completa!',
        confirmButtonText: 'Continuar'
      });
    }, 800);
  }

  editarActa(idActa: string, idSesion: string) {
    this.router.navigate(['/panel/sesiones-de-trabajo/' + idSesion + '/acta/editar/' + idActa]);
  }

  listarAcuerdos(idActa: any, idSesion: any) {
    this.router.navigate(['/panel/seguimiento-de-acuerdos/' + idSesion + '/acta/' + idActa + '/acuerdos']);
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
