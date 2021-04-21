import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { SesionTrabajoService } from 'src/app/services/sesion-trabajo.service';
import { SesionTrabajoResponse } from 'src/app/dto/response/SesionTrabajo.response';

@Component({
  selector: 'app-sesiones-datos-sesion',
  templateUrl: './sesiones-datos-sesion.component.html',
  styleUrls: ['./sesiones-datos-sesion.component.scss']
})
export class SesionesDatosSesionComponent implements OnInit, OnChanges {

  sesionesTipo = [
    {codigo: 1, descripcion: 'Ordinaria'},
    {codigo: 2, descripcion: 'Extraordinaria'},
  ];

  @Input()
  sesionDeTrabajo: any;

  @Output() guardarEmit = new EventEmitter();
  @Output() cancelarEmit = new EventEmitter();


  sesionDeTrabajoForm: FormGroup;

  constructor(private fb: FormBuilder,
    private spinnerService: NgxSpinnerService,
    private router: Router,) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // INICIA EL FORMUALRIO AQUI
    if (changes.sesionDeTrabajo.currentValue) {
      this.sesionDeTrabajoForm.setValue({
        numeroSesion: this.sesionDeTrabajo.vCodsesion,
        tipoSesion: this.sesionDeTrabajo.tipoSesiones.tIposesionidpk,
        fechaSesion: this.sesionDeTrabajo.dFecreacion ? new Date(this.sesionDeTrabajo.dFecreacion.toString().replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")) : '',
        horaInicio: this.sesionDeTrabajo.dHorinicio,
        horaTermino: this.sesionDeTrabajo.dHorfin,
      });
    }
  }
 

  ngOnInit() {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      this.sesionDeTrabajoForm.disable();
    }, 800);

    this.sesionDeTrabajoForm = this.fb.group({
      numeroSesion: ['', Validators.required],
      tipoSesion: ['', Validators.required],
      fechaSesion: ['', Validators.required],
      horaInicio: ['', Validators.required],
      horaTermino: ['', Validators.required],
    });

  }

  cancelar() {
    this.cancelarEmit.emit();
  }

  // guardar() {
  //   this.guardarEmit.emit();
  // }
}
