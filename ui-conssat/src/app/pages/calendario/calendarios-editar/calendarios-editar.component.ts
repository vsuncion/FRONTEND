import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { deleteConfig, editConfig } from '../../../services/sweetAlertConfig';
import { CalendarioActividadesService } from 'src/app/services/calendarioActividades.service';
import { CalendarioActividadResponse } from 'src/app/dto/response/CalendarioActividad.response';
import { ActualizarCalendarioRequest } from 'src/app/dto/request/ActualizarCalendario.request';
import { DatePipe } from '@angular/common';
import { CalendarioAntividadActualizarResponse } from 'src/app/dto/response/CalendarioActividadActualizar.response';
import { MatDialog } from '@angular/material';
import { AgregarParticipanteComponent } from './agregar-participante/agregar-participante.component';
import { CalendarioParticipanteResponse } from 'src/app/dto/response/CalendadrioParticipante.response';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { BuscarComisionComponent } from '../../informes-anuales/informes-anuales-nuevo/buscar-comision/buscar-comision.component';
import { ComisionResponse } from 'src/app/dto/response/Comision.response';

interface ParticipanteRow {
  id: number;
  participa: boolean;
  nombres: string;
  tipoDocumento: string;
  numeroDocumento: string;
  entidad: string;
  email: string;
}

@Component({
  selector: 'app-calendarios-editar',
  templateUrl: './calendarios-editar.component.html',
  styleUrls: ['./calendarios-editar.component.scss']
})
export class CalendariosEditarComponent implements OnInit {
  private sub: any;
  id: number;

  actividadForm: FormGroup;


  // PARTICIPANTES: ParticipanteRow[] = [
  //   {
  //     id: 1,
  //     participa: true,
  //     nombres: 'LUIS CORTZ CABALLERO',
  //     tipoDocumento: 'DNI',
  //     numeroDocumento: '90009876',
  //     entidad: 'SUNAT',
  //     email: 'luis.cortex@gmail.com',
  //   }
  // ];

  dataSource = [];
  displayedColumns: string[] = ['nro', 'participa', 'nombres', 'tipoDocumento', 'numeroDocumento', 'entidad', 'email', 'eliminar'];


  constructor(private fb: FormBuilder, private spinnerService: NgxSpinnerService, private router: Router,

              private route: ActivatedRoute, public dialog: MatDialog,
              private datePipe: DatePipe, public comisiones: MatDialog,
              @Inject(CalendarioActividadesService) private calendarioActividadesService: CalendarioActividadesService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params.id;
    });

    this.actividadForm = this.fb.group({
      actividad: ['', Validators.required],
      fecha: ['', Validators.required],
      horaInicio: ['', Validators.required],
      horaTermino: ['', Validators.required],
      fueEjecutado: [''],
      fechaEjecucion: [''],
      comentario: [''],
      comision: [''],
    });

    this.obtenerCalendarioActividades();
    this.listarParticipantes();
    this.verificarcookies();
  }

  obtenerCalendarioActividades() {
    this.calendarioActividadesService.buscarCalendarioActPorId(this.id).subscribe(
      (data: CalendarioActividadResponse) => {
        console.log('BUSQUEDA POR ID');
        console.log(data);
        this.actividadForm.setValue({
          actividad: data.vDesactividad,
          fecha: data.dFecactividad ? new Date(data.dFecactividad.toString().replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3')) : '',
          horaInicio: data.vHorainicio,
          horaTermino: data.vHorafin,
          fueEjecutado: data.cFlgejecuto === '0' ? false : true,
          fechaEjecucion: data.dFecejecuto ? new Date(data.dFecejecuto.toString().replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3')) : '',
          comentario: data.vDesejecucion,
          comision: data.cOmisionfk,
        });
        this.spinnerService.hide();
      }, error => {
        console.log(error);
        this.spinnerService.hide();
      }
    );
  }

  guardar() {
    const req = new ActualizarCalendarioRequest();
    req.cAlendarioidpk = this.id;
    req.cOmisionfk = this.actividadForm.get('comision').value;
    req.vDesactividad = this.actividadForm.get('actividad').value;
    req.vFechaActividad = this.datePipe.transform(this.actividadForm.get('fecha').value, 'dd-MM-yyyy');
    req.vHorainicio = this.actividadForm.get('horaInicio').value;
    req.vHorafin = this.actividadForm.get('horaTermino').value;
    req.cFlgejecuto = this.actividadForm.get('fueEjecutado').value === true ? '1' : '0';
    req.dFecejecuto = this.datePipe.transform(this.actividadForm.get('fechaEjecucion').value, 'dd-MM-yyyy');
    req.vDesejecucion = this.actividadForm.get('comentario').value;

    this.spinnerService.show();
    this.calendarioActividadesService.actualizarCalendario(req).subscribe(
      (data: CalendarioAntividadActualizarResponse) => {
        console.log(data);
        setTimeout(() => {
          this.spinnerService.hide();
          Swal.fire(editConfig).then((result) => {
            this.router.navigate(['/panel/calendarios']);
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
    this.router.navigate(['/panel/calendarios']);

  }



  agregarParticipantes() {
    const dialogRef = this.dialog.open(AgregarParticipanteComponent, {
      width: '900px',
      disableClose: true,
      data: {
        idSesion: this.id,
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.listarParticipantes();
      }
    });
  }

  listarParticipantes() {
    // LLAMAR A SERVICIO
    this.calendarioActividadesService.listarParticipantesCalendario(this.id).subscribe(
      (data: CalendarioParticipanteResponse[]) => {
        console.log(data);
        this.dataSource = data;
      },
      error => {
        console.log(error);
      }
    );

    // dataSource
  }

  eliminarRegistro(id: number) {
    this.spinnerService.show();

    this.calendarioActividadesService.eliminarParticipanteCalendario(id).subscribe(
      (data: CalendarioParticipanteResponse) => {
        console.log(data);
        setTimeout(() => {
          this.spinnerService.hide();
          Swal.fire(deleteConfig);
          this.listarParticipantes();
        }, 800);
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
  verificarrol() {
    if (Cookie.get('idrol') === 'ROLE_OPECONSSAT' || Cookie.get('idrol') === 'ROLE_OPECORSSAT') {
      return true;
    } else {
      return false;
    }
  }

  buscarComision() {
    const dialogRef = this.comisiones.
      open(BuscarComisionComponent, {
        width: '900px',
        disableClose: true,
        data: {
          // idSesion: this.id,
        }
      });

    dialogRef.afterClosed().subscribe((result: ComisionResponse) => {
      if (result != null) {
        console.log(result);
        this.actividadForm.get('comision').setValue(result.vCodcomision);
        // this.listarAsistenciaSesionTrabajo()
      }
    });
  }
}
