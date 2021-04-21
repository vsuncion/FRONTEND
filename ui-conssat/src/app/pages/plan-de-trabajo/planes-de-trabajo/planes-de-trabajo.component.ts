import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { deleteConfig, decargaConfig, errorConfig } from '../../../services/sweetAlertConfig';
import { PlanTrabajoService } from 'src/app/services/plan-trabajo.service';
import { PlanTrabajoResponse } from 'src/app/dto/response/PlanTrabajo.response';
import { BuscarPlanTrabajoRequest } from 'src/app/dto/request/BuscarPlanTrabajo.request';
import { DatePipe } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ValidationService } from 'src/app/services/validation.service';

interface ConsejerRowResponse {

  id: number;
  codigoPT: string;
  documentoAprobacion: string;
  fechaAprobacion: string;
  fechaInicio: string;
  fechaFin: string;
  archivo: string;

}

@Component({
  selector: 'app-planes-de-trabajo',
  templateUrl: './planes-de-trabajo.component.html',
  styleUrls: ['./planes-de-trabajo.component.scss']
})
export class PlanesDeTrabajoComponent implements OnInit {


  const;

  busquedaForm: FormGroup;

  listaPlanesTrabajo = [];
  dataSource: MatTableDataSource<any> = null;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  displayedColumns: string[] = ['nro', 'codigoPT', 'documentoAprobacion', 'archivo', 'fechaAprobacion', 'fechaInicio', 'fechaFin', 'ver', 'editar', 'eliminar'];

  constructor(private fb: FormBuilder, private spinnerService: NgxSpinnerService, private router: Router,
              @Inject(PlanTrabajoService) private planTrabajoService: PlanTrabajoService,
              private datePipe: DatePipe, private validationService: ValidationService) {
  }

  ngOnInit() {

    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      // INICIA EL FORMUALRIO AQUI
    }, 800);

    this.busquedaForm = this.fb.group({
      codigo: [''],
      fechaInicioAprobacion: [''],
      fechaFinAprobacion: [''],
      fechaInicioVigencia: [''],
      fechaFinVigencia: ['']
    });

    this.listarPlanTrabajo();
    this.verificarcookies();
  }

  public cargarDatosTabla(): void {
    if (this.listaPlanesTrabajo.length > 0) {
      this.dataSource = new MatTableDataSource(this.listaPlanesTrabajo);
      this.dataSource.paginator = this.paginator;
    } else {
      this.listaPlanesTrabajo = [];
      this.dataSource = new MatTableDataSource(this.listaPlanesTrabajo);
      this.dataSource.paginator = this.paginator;
    }
  }

  buscar(): void {
    // busquedaForm
    console.log('hola');

    let req = new BuscarPlanTrabajoRequest();
    req.vCodigoplantrab = this.busquedaForm.get('codigo').value;
    req.dFecaprobacion = this.busquedaForm.get('fechaInicioAprobacion').value ? this.datePipe.transform(this.busquedaForm.get('fechaInicioAprobacion').value, 'dd-MM-yyyy') : null;
    req.dFecaprobacionfin = this.busquedaForm.get('fechaFinAprobacion').value ? this.datePipe.transform(this.busquedaForm.get('fechaFinAprobacion').value, 'dd-MM-yyyy') : null;
    req.dFecinicio = this.busquedaForm.get('fechaInicioVigencia').value ? this.datePipe.transform(this.busquedaForm.get('fechaInicioVigencia').value, 'dd-MM-yyyy') : null;
    req.dFecfin = this.busquedaForm.get('fechaFinVigencia').value ? this.datePipe.transform(this.busquedaForm.get('fechaFinVigencia').value, 'dd-MM-yyyy') : null;

    this.planTrabajoService.buscarPlanTrabajo(req).subscribe(
      (data: PlanTrabajoResponse[]) => {
        console.log(data);
        this.listaPlanesTrabajo = data;
        this.cargarDatosTabla();
      },
      error => {
        console.log(error);
      }
    );

  }

  listarPlanTrabajo() {
    // LLAMAR A SERVICIO
    this.planTrabajoService.listarPlanTrabajo().subscribe(
      (data: PlanTrabajoResponse[]) => {
        console.log(data);
        this.listaPlanesTrabajo = data;
        this.cargarDatosTabla();
      },
      error => {
        console.log(error);
      }
    );

    // listaPlanesTrabajo
  }

  verRegistro(id: any) {
    this.router.navigate(['/panel/planes-de-trabajo/ver/', id]);
  }

  editarRegistro(id: any) {
    this.router.navigate(['/panel/planes-de-trabajo/editar/', id]);
  }

  eliminarRegistro(id: any) {
    this.spinnerService.show();

    this.planTrabajoService.eliminarPlanTrabajo(id).subscribe(
      (data: PlanTrabajoResponse) => {
        console.log(data);
        setTimeout(() => {
          this.spinnerService.hide();
          Swal.fire(deleteConfig);
          this.listarPlanTrabajo();
        }, 800);
      },
      error => {
        console.log(error);
      }
    );
  }

  nuevoRegistro() {
    this.router.navigate(['/panel/planes-de-trabajo/nuevo']);
  }

  decargarArchivo(id: number) {
    this.spinnerService.show();

    this.planTrabajoService.decargarDocAprobacion(id).subscribe(
      (data: HttpResponse<Blob>) => {
        this.spinnerService.hide();
        this.planTrabajoService.descargarArchivo(data.body);
      },
      error => {
        console.error(error);
        Swal.fire(errorConfig);
      });
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
