import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { deleteConfig, saveConfig } from '../../../services/sweetAlertConfig';
import { RegistrarCalendarioRequest } from 'src/app/dto/request/RegistrarCalendario.request';
import { DatePipe } from '@angular/common';
import { CalendarioActividadesService } from 'src/app/services/calendarioActividades.service';
import { CalendarioActividadResponse } from 'src/app/dto/response/CalendarioActividad.response';
import { MatDialog } from '@angular/material';
import { AgregarParticipanteComponent } from '../calendarios-editar/agregar-participante/agregar-participante.component';
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
  selector: 'app-calendarios-nuevo',
  templateUrl: './calendarios-nuevo.component.html',
  styleUrls: ['./calendarios-nuevo.component.scss']
})
export class CalendariosNuevoComponent implements OnInit {
  id: number;

  actividadForm: FormGroup;

  PARTICIPANTES: ParticipanteRow[] = [];

  dataSource = [];
  displayedColumns: string[] = ['nro', 'participa', 'nombres', 'tipoDocumento', 'numeroDocumento', 'entidad', 'email', 'eliminar'];

  constructor(private fb: FormBuilder, private spinnerService: NgxSpinnerService, private router: Router,
              private datePipe: DatePipe, public dialog: MatDialog, public comisiones: MatDialog,
              @Inject(CalendarioActividadesService) private calendarioActividadesService: CalendarioActividadesService) {
  }

  ngOnInit() {
    this.id = 0;

    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      // INICIA EL FORMUALRIO AQUI
    }, 800);

    this.actividadForm = this.fb.group({
      actividad: ['', Validators.required],
      fecha: ['', Validators.required],
      horaInicio: ['', Validators.required],
      horaTermino: ['', Validators.required],
      fueEjecutado: [''],
      fechaEjecucion: [''],
      comentario: [''],
      comision: ['' ],
    });

    this.listarParticipantes();
    this.verificarcookies();
  }

  guardar() {
    const req = new RegistrarCalendarioRequest();
    req.cOmisionfk = '';
    req.vDesactividad = this.actividadForm.get('actividad').value;
    req.vFechaActividad = this.datePipe.transform(this.actividadForm.get('fecha').value, 'dd-MM-yyyy');
    req.vHorainicio = this.actividadForm.get('horaInicio').value;
    req.vHorafin = this.actividadForm.get('horaTermino').value;
    req.cFlgejecuto = this.actividadForm.get('fueEjecutado').value === true ? '1' : '0';
    req.dFecejecuto = this.datePipe.transform(this.actividadForm.get('fechaEjecucion').value, 'dd-MM-yyyy');
    req.vDesejecucion = this.actividadForm.get('comentario').value;
    req.cOmisionfk = this.actividadForm.get('comision').value;
    this.spinnerService.show();
    this.calendarioActividadesService.registrarCalendarioActividad(req).subscribe(
      (data: CalendarioActividadResponse) => {
        console.log(data);
        setTimeout(() => {
          this.spinnerService.hide();
          Swal.fire(saveConfig).then((result) => {

            this.id = data.cAlendarioidpk;
            this.actividadForm.disable();
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
    if (!Cookie.get('inforegioncodigo') ) {
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
