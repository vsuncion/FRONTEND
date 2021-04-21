import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SeguimientoAcuerdoService } from 'src/app/services/seguimiento-acuerdo.service';
import { SeguimientoAcuerdoActaResponse } from 'src/app/dto/response/SeguimientoAcuerdoActa.response';
import { NgxSpinnerService } from 'ngx-spinner';
import { FijasService } from 'src/app/services/fijas.service';
import { TipoSesionesResponse } from 'src/app/dto/response/SesionTrabajo.response';

@Component({
  selector: 'app-datos-de-sesion',
  templateUrl: './datos-de-sesion.component.html',
  styleUrls: ['./datos-de-sesion.component.scss']
})
export class DatosDeSesionComponent implements OnInit {
  private sub: any;
  idActa: number;
  idSesion: number;
  idAcuerdo: number;

  tiposSesiones = [];

  sesionDeTrabajoForm: FormGroup;


  @Output()
  cancelarEmit = new EventEmitter();

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
              @Inject(SeguimientoAcuerdoService) private seguimientoAcuerdoService: SeguimientoAcuerdoService,
              private spinnerService: NgxSpinnerService,
              @Inject(FijasService) private fijasService: FijasService) {
  }


  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.idActa = params.idActa;
      this.idSesion = params.idSesion;
      this.idAcuerdo = params.idAcuerdo;
    });

    console.log('Datos recuperados ');
    console.log(this.idActa);
    console.log(this.idSesion);
    console.log(this.idAcuerdo);

    this.sesionDeTrabajoForm = this.fb.group({
      numeroSesion: ['', Validators.required],
      numeroActa: ['', Validators.required],
      tipoSesion: ['', Validators.required],
      fechaActa: ['', Validators.required],
      acuerdo: ['', Validators.required],
      responsable: ['', Validators.required],
      entidad: ['', Validators.required],
      fechaAtencion: ['', Validators.required],
    });
    this.sesionDeTrabajoForm.disable();

    this.obtenerSesionActaAcuerdo();
    this.listarTipoSesion();
  }

  obtenerSesionActaAcuerdo() {
    this.seguimientoAcuerdoService.buscarSesionActaAcuerdoPorId(this.idAcuerdo).subscribe(
      (data: SeguimientoAcuerdoActaResponse) => {
        console.log('BUSQUEDA POR ID');
        console.log(data);
        this.sesionDeTrabajoForm.setValue({
          numeroSesion: data.acta.sesionfk.vCodsesion,
          numeroActa: data.acta.vCodacta,
          tipoSesion: data.acta.sesionfk.tipoSesiones.tIposesionidpk,
          fechaActa: data.acta.dFecacta ? new Date(data.acta.dFecacta.toString().replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3')) : '',
          acuerdo: data.vDesacuerdo,
          responsable: data.vResponsable,
          entidad: data.entidad.vDesnombre,
          fechaAtencion: data.dFecatencion ? new Date(data.dFecatencion.toString().replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3')) : '',

        });
        this.spinnerService.hide();
      }, error => {
        console.log(error);
        this.spinnerService.hide();
      }
    );
  }

  cancelar() {
    this.cancelarEmit.emit();
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

}
