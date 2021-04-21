import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { SesionTrabajoService } from 'src/app/services/sesion-trabajo.service';
import { SesionTrabajoResponse } from 'src/app/dto/response/SesionTrabajo.response';
import { Cookie } from 'ng2-cookies/ng2-cookies';


@Component({
  selector: 'app-sesiones-de-trabajo-ver',
  templateUrl: './sesiones-de-trabajo-ver.component.html',
  styleUrls: ['./sesiones-de-trabajo-ver.component.scss']
})
export class SesionesDeTrabajoVerComponent implements OnInit {
  private sub: any;
  id: number;

  sesionesTipo = [
    { codigo: 1, descripcion: 'Ordinaria' },
    { codigo: 2, descripcion: 'Extraordinaria' },
  ];
  sesionDeTrabajoForm: FormGroup;

  constructor(private fb: FormBuilder, private spinnerService: NgxSpinnerService, private router: Router,
              private route: ActivatedRoute,
              @Inject(SesionTrabajoService) private sesionTrabajoService: SesionTrabajoService) {
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

    this.sesionDeTrabajoForm.disable();

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


  cancelar() {
    this.router.navigate(['/panel/sesiones-de-trabajo']);
  }
  verificarcookies() {
    if (!Cookie.get('inforegioncodigo') ) {
      this.router.navigate(['/login']);
    }
  }
}
