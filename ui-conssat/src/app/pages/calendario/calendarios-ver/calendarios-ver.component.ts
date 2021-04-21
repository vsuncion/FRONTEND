import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { deleteConfig } from '../../../services/sweetAlertConfig';
import { CalendarioActividadesService } from 'src/app/services/calendarioActividades.service';
import { CalendarioActividadResponse } from 'src/app/dto/response/CalendarioActividad.response';
import { Cookie } from 'ng2-cookies/ng2-cookies';

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
  selector: 'app-calendarios-ver',
  templateUrl: './calendarios-ver.component.html',
  styleUrls: ['./calendarios-ver.component.scss']
})
export class CalendariosVerComponent implements OnInit {
  private sub: any;
  id: number;

  actividadForm: FormGroup;

  PARTICIPANTES: ParticipanteRow[] = [
    {
      id: 1,
      participa: true,
      nombres: 'LUIS CORTZ CABALLERO',
      tipoDocumento: 'DNI',
      numeroDocumento: '90009876',
      entidad: 'SUNAT',
      email: 'luis.cortex@gmail.com',
    }
  ];

  dataSource = this.PARTICIPANTES;
  displayedColumns: string[] = ['nro', 'participa', 'nombres', 'tipoDocumento', 'numeroDocumento', 'entidad', 'email'];

  constructor(private fb: FormBuilder, private spinnerService: NgxSpinnerService, private router: Router,
              private route: ActivatedRoute,
              @Inject(CalendarioActividadesService)private calendarioActividadesService: CalendarioActividadesService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });


    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      // INICIA EL FORMUALRIO AQUI

      // this.actividadForm.setValue({
      //   actividad: 'VOLUNTARIADO SERVIR',
      //   fecha: new Date(),
      //   horaInicio: '3:00 PM',
      //   horaTermino: '4:00 PM',
      //   fueEjecutado: true,
      //   comentario: 'La actividad se realizó en presencia el secretario general',
      // });
      this.actividadForm.disable();
    }, 800);

    this.actividadForm = this.fb.group({
      actividad: ['', Validators.required],
      fecha: ['', Validators.required],
      horaInicio: ['', Validators.required],
      horaTermino: ['', Validators.required],
      fueEjecutado: ['', Validators.required],
      comentario: ['', Validators.required],
      comision: [''],
    });

    this.obtenerCalendarioActividades();
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
          fueEjecutado: data.cFlgejecuto,
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

  cancelar() {
    this.router.navigate(['/panel/calendarios']);

  }

  eliminarRegistro(codigoContrato: any) {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      Swal.fire(deleteConfig);
    }, 800);
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
}
