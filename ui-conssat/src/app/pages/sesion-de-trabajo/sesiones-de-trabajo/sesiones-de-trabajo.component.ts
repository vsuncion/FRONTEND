import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { deleteConfig, editConfig } from '../../../services/sweetAlertConfig';
import { SesionTrabajoService } from 'src/app/services/sesion-trabajo.service';
import { SesionTrabajoResponse, TipoSesionesResponse } from 'src/app/dto/response/SesionTrabajo.response';
import { BuscarSesionTrabajoRequest } from 'src/app/dto/request/BuscarSesionTrabajo.request';
import { DatePipe } from '@angular/common';
import { FijasService } from 'src/app/services/fijas.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ValidationService } from 'src/app/services/validation.service';

interface SesionRowResponse {

  id: number;
  numeroComision: string;
  numeroSesion: string;
  fechaSesion: string;
  tipoSesion: string;
  asistencia: string;
  temas: string;
  acta: string;

}

@Component({
  selector: 'app-sesiones-de-trabajo',
  templateUrl: './sesiones-de-trabajo.component.html',
  styleUrls: ['./sesiones-de-trabajo.component.scss']
})
export class SesionesDeTrabajoComponent implements OnInit {


  const;

  tiposSesiones = [];

  busquedaForm: FormGroup;

  listaSesionesTrabajo = [];
  dataSource: MatTableDataSource<any> = null;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  displayedColumns: string[] = ['numeroComision', 'numeroSesion', 'fechaSesion', 'tipoSesion', 'asistencia', 'temas', 'acta', 'ver', 'editar', 'eliminar'];

  constructor(private fb: FormBuilder, private spinnerService: NgxSpinnerService, private router: Router,
              @Inject(SesionTrabajoService) private sesionTrabajoService: SesionTrabajoService,
              private datePipe: DatePipe,
              @Inject(FijasService) private fijasService: FijasService, private validationService: ValidationService) {
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

    this.listarSesionTrabajo();
    this.listarTipoSesion();
    this.verificarcookies();
  }

  public cargarDatosTabla(): void {
    if (this.listaSesionesTrabajo.length > 0) {
      this.dataSource = new MatTableDataSource(this.listaSesionesTrabajo);
      this.dataSource.paginator = this.paginator;
    } else {
      this.listaSesionesTrabajo = [];
      this.dataSource = new MatTableDataSource(this.listaSesionesTrabajo);
      this.dataSource.paginator = this.paginator;
    }
  }

  listarSesionTrabajo() {
    // LLAMAR A SERVICIO
    this.sesionTrabajoService.listarSesionTrabajo().subscribe(
      (data: SesionTrabajoResponse[]) => {
        console.log(data);
        this.listaSesionesTrabajo = data;
        this.cargarDatosTabla();
      },
      error => {
        console.log(error);
      }
    );

    // dataSource
  }


  buscarSesionTrabajo() {
    // busquedaForm
    this.spinnerService.show();
    console.log('hola');
    const formData = new FormData();
    formData.append('codigosesion', this.busquedaForm.get('numeroSesion').value);
    formData.append('tiposesion', this.busquedaForm.get('tipoSesion').value);
    formData.append('fechainicio', this.datePipe.transform(this.busquedaForm.get('fechaInicioSesion').value, 'dd-MM-yyyy'));
    formData.append('fechafin', this.datePipe.transform(this.busquedaForm.get('fechaFinSesion').value, 'dd-MM-yyyy'));

    this.sesionTrabajoService.buscarSesionTrabajo(formData).subscribe(
      (data: SesionTrabajoResponse[]) => {
        console.log(data);
        this.spinnerService.hide();
        this.listaSesionesTrabajo = data;
        this.cargarDatosTabla();
      }, error => {
        console.log(error);
        this.spinnerService.hide();
      }
    );

  }



  verRegistro(id: any) {
    this.router.navigate(['/panel/sesiones-de-trabajo/ver/', id]);
  }

  editarRegistro(id: any) {
    this.router.navigate(['/panel/sesiones-de-trabajo/editar/', id]);
  }

  eliminarRegistro(id: number) {
    this.spinnerService.show();

    this.sesionTrabajoService.eliminarSesionTrabajo(id).subscribe(
      (data: SesionTrabajoResponse) => {
        console.log(data);
        setTimeout(() => {
          this.spinnerService.hide();
          Swal.fire(deleteConfig);
          this.listarSesionTrabajo();
        }, 800);
      },
      error => {
        console.log(error);
      }
    );
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

  asistencia(idSesion: any) {
    this.router.navigate(['/panel/sesiones-de-trabajo/' + idSesion + '/asistencia']);
  }

  agregarTema(idSesion: any) {
    this.router.navigate(['/panel/sesiones-de-trabajo/' + idSesion + '/tema']);
  }

  agregarActa(idSesion: any) {
    this.router.navigate(['/panel/sesiones-de-trabajo/' + idSesion + '/acta/nuevo']);
  }

  listarTipoSesion() {
    this.fijasService.listarTipoSesion().subscribe(
      (data: TipoSesionesResponse[]) => {
        console.log(data);
        this.tiposSesiones = data;
      },
      error => {
        console.log(error);
      }
    );
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
