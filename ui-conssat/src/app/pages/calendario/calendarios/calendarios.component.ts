import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/src/sweetalert2.js';
import { deleteConfig } from '../../../services/sweetAlertConfig';
import { CalendarioActividadesService } from 'src/app/services/calendarioActividades.service';
import { CalendarioActividadResponse } from 'src/app/dto/response/CalendarioActividad.response';
import { BuscarCalendarioRequest } from 'src/app/dto/request/BuscarCalendario.Request';
import { DatePipe } from '@angular/common';
import { CalendarioActividadBuscarResponse } from 'src/app/dto/response/CalendarioActividadBuscar.response';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ValidationService } from 'src/app/services/validation.service';


interface ConsejerRowResponse {

  id: number;
  actividad: string;
  fechaActividad: string;
  horaInicio: string;
  horaFin: string;
  fueEjecutado: string;
  fechaEjecucion: string;

}

@Component({
  selector: 'app-calendarios',
  templateUrl: './calendarios.component.html',
  styleUrls: ['./calendarios.component.scss']
})
export class CalendariosComponent implements OnInit {


  ELEMENT_DATA: ConsejerRowResponse[] = [
    {
      id: 1,
      actividad: 'ACT-2020-01',
      fechaActividad: '21/02/2020',
      horaInicio: '3:00PM',
      horaFin: '4:00PM',
      fueEjecutado: 'SI',
      fechaEjecucion: '21/02/2020',
    }
  ];

  busquedaForm: FormGroup;

  listaCalendarios = [];
  dataSource: MatTableDataSource<any> = null;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  displayedColumns: string[] = ['item', 'actividad', 'fechaActividad', 'horaInicio', 'horaFin', 'fueEjecutado', 'fechaEjecucion', 'ver', 'editar', 'eliminar'];

  constructor(private fb: FormBuilder, private spinnerService: NgxSpinnerService, private router: Router,
              private datePipe: DatePipe,
              @Inject(CalendarioActividadesService) private calendarioActividadesService: CalendarioActividadesService,
              private validationService: ValidationService) {
  }

  ngOnInit() {

    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      // INICIA EL FORMUALRIO AQUI
    }, 800);

    this.busquedaForm = this.fb.group({
      actividad: [''],
      fechaInicioActividad: [''],
      fechaFinActividad: [''],
      fueEjecutado: [''],
      fechaEjecucionActividad: [''],
    });

    this.listarCalendario();
    this.verificarcookies();
  }

  public cargarDatosTabla(): void {
    if (this.listaCalendarios.length > 0) {
      this.dataSource = new MatTableDataSource(this.listaCalendarios);
      this.dataSource.paginator = this.paginator;
    } else {
      this.listaCalendarios = [];
      this.dataSource = new MatTableDataSource(this.listaCalendarios);
      this.dataSource.paginator = this.paginator;
    }
  }

  listarCalendario() {
    // LLAMAR A SERVICIO
    this.calendarioActividadesService.listarCalendarioActividad().subscribe(
      (data: CalendarioActividadResponse[]) => {
        console.log(data);
        this.listaCalendarios = data;
        this.cargarDatosTabla();
      },
      error => {
        console.log(error);
      }
    );

    // dataSource
  }

  buscarCalendarioActividades() {
    // busquedaForm
    this.spinnerService.show();
    console.log('buscar ');
    let req = new BuscarCalendarioRequest();
    req.vDesactividad = (this.busquedaForm.get('actividad').value === '' ? null : this.busquedaForm.get('actividad').value);
    req.vFechaInicioActividad = this.datePipe.transform(this.busquedaForm.get('fechaInicioActividad').value, 'dd-MM-yyyy');
    req.vFechaFinActividad = this.datePipe.transform(this.busquedaForm.get('fechaFinActividad').value, 'dd-MM-yyyy');
    req.cFlgejecuto = (this.busquedaForm.get('fueEjecutado').value === '' ? null : this.busquedaForm.get('fueEjecutado').value);
    req.vFechaActividad = this.datePipe.transform(this.busquedaForm.get('fechaEjecucionActividad').value, 'dd-MM-yyyy');
    console.log(req);

    this.calendarioActividadesService.buscarCalendario(req).subscribe(
      (data: CalendarioActividadBuscarResponse[]) => {
        console.log(data);
        this.spinnerService.hide();
        this.listaCalendarios = data;
        this.cargarDatosTabla();
      }, error => {
        console.log(error);
        this.spinnerService.hide();
      }
    );

  }

  verRegistro(id: any) {
    this.router.navigate(['/panel/calendarios/ver/' + id]);
  }

  editarRegistro(id: any) {
    this.router.navigate(['/panel/calendarios/editar/' + id]);
  }


  eliminarRegistro(id: number) {
    this.spinnerService.show();

    this.calendarioActividadesService.eliminarCalendario(id).subscribe(
      (data: CalendarioActividadBuscarResponse) => {
        console.log(data);
        setTimeout(() => {
          this.spinnerService.hide();
          Swal.fire(deleteConfig);
          this.listarCalendario();
        }, 800);
      },
      error => {
        console.log(error);
      }
    );
  }

  nuevoRegistro() {
    this.router.navigate(['/panel/calendarios/nuevo']);
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
