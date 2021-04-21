import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { editConfig } from '../../../services/sweetAlertConfig';
import { SesionTrabajoService } from 'src/app/services/sesion-trabajo.service';
import { DatePipe } from '@angular/common';
import { SesionTrabajoResponse } from 'src/app/dto/response/SesionTrabajo.response';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-sesiones-de-trabajo-editar',
  templateUrl: './sesiones-de-trabajo-editar.component.html',
  styleUrls: ['./sesiones-de-trabajo-editar.component.scss']
})
export class SesionesDeTrabajoEditarComponent implements OnInit {
  private sub: any;
  id: number;
  sesionTrabajo: any;

  sesionesTipo = [
    { codigo: 1, descripcion: 'Ordinaria' },
    { codigo: 2, descripcion: 'Extraordinaria' },
  ];
  sesionDeTrabajoForm: FormGroup;

  constructor(private fb: FormBuilder, private spinnerService: NgxSpinnerService, private router: Router,
              private route: ActivatedRoute,
              @Inject(SesionTrabajoService) private sesionTrabajoService: SesionTrabajoService,
              private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params.id;
    });

    this.sesionDeTrabajoForm = this.fb.group({
      numeroSesion: ['', Validators.required],
      tipoSesion: ['', Validators.required],
      fechaSesion: ['', Validators.required],
      horaInicio: ['', Validators.required],
      horaTermino: ['', Validators.required],
    });

    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      // INICIA EL FORMUALRIO AQUI
    }, 800);

    this.obtenerSesionTrabajo();
    this.verificarcookies();
  }

  obtenerSesionTrabajo() {
    this.sesionTrabajoService.buscarSesionTrabajoPorId(this.id).subscribe(
      (data: SesionTrabajoResponse) => {
        console.log('BUSQUEDA POR ID');
        console.log(data);
        this.sesionTrabajo = data;
        this.sesionDeTrabajoForm.setValue({
          numeroSesion: data.vCodsesion,
          tipoSesion: data.tipoSesiones.tIposesionidpk,
          fechaSesion: data.dFecreacion ? new Date(data.dFecreacion.toString().replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3')) : '',
          horaInicio: data.dHorinicio,
          horaTermino: data.dHorfin,
        });
      }, error => {
        console.log(error);
      }
    );
  }

  guardar() {
    const formData = new FormData();
    formData.append('cOmisionfk', '');
    formData.append('tiposesion', this.sesionDeTrabajoForm.get('tipoSesion').value);
    formData.append('dFecreacion', this.datePipe.transform(this.sesionDeTrabajoForm.get('fechaSesion').value, 'dd-MM-yyyy'));
    formData.append('dHorinicio', this.sesionDeTrabajoForm.get('horaInicio').value);
    formData.append('dHorfin', this.sesionDeTrabajoForm.get('horaTermino').value);
    formData.append('codusuario', '');
    formData.append('sEsionidpk', this.sesionTrabajo.sEsionidpk);

    this.sesionTrabajoService.actualizarSesionTrabajo(formData).subscribe(
      (data: SesionTrabajoResponse) => {
        console.log(data);
        this.spinnerService.show();
        setTimeout(() => {
          this.spinnerService.hide();
          Swal.fire(editConfig).then((result) => {
            this.router.navigate(['/panel/sesiones-de-trabajo']);
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
    this.router.navigate(['/panel/sesiones-de-trabajo']);
  }
  verificarcookies() {
    if (!Cookie.get('inforegioncodigo') ) {
      this.router.navigate(['/login']);
    }
  }

}
