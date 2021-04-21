import {Component, OnInit} from '@angular/core';
import {AcuerdoRow} from '../../model/acuerdoRow';
import {FirmanteRow} from '../../model/firmanteRow';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {Location} from '@angular/common';
import {editConfig} from '../../../../services/sweetAlertConfig';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-sesiones-acta-editar',
  templateUrl: './sesiones-acta-editar.component.html',
  styleUrls: ['./sesiones-acta-editar.component.scss']
})
export class SesionesActaEditarComponent implements OnInit {


  acuerdosList: AcuerdoRow[] = [];
  firmanteList: FirmanteRow[] = [];


  sesionesTipo = [
    {codigo: '01', descripcion: 'Ordinaria'},
    {codigo: '02', descripcion: 'Extraordinaria'},
  ];

  sesionDeTrabajoForm: FormGroup;
  actaForm: FormGroup;
  sesionDeTrabajo: any;

  constructor(private fb: FormBuilder,
              private spinnerService: NgxSpinnerService,
              private router: Router,
              private location: Location) {
  }

  ngOnInit() {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      // INICIA EL FORMUALRIO AQUI
      this.actaForm.setValue({
        numeroActa: 'ACT-0-2020-001',
        fechaActa: new Date(),
        adjuntoActa: ''
      });

      this.sesionDeTrabajo = {
        numeroSesion: '90898990',
        tipoSesion: '02',
        fechaSesion: new Date(),
        horaInicio: '3:00 pm',
        horaTermino: '4:00 pm',
      };

      this.acuerdosList.push(
        {
          descripcion: 'TEMA PRUEBA 1',
          responsable: 'JESUS CASTRO CASTRO',
          entidad: 'INDECOPI',
          fechaLimite: '22/02/2020',
        },
        {
          descripcion: 'TEMA PRUEBA 2',
          responsable: 'MARIA DEL PILAR VARGAS MESA',
          entidad: 'INDECOPI',
          fechaLimite: '22/02/2020',
        },
        {
          descripcion: 'TEMA PRUEBA 3',
          responsable: 'JOSE VARGAS LORA',
          entidad: 'INDECOPI',
          fechaLimite: '22/02/2020',
        }
      );

      this.firmanteList.push(
        {
          asistio: true,
          tipoDocumento: 'DNI',
          numeroDocumento: '45454500',
          nombres: 'CARLOS LOPEZ VARGAS',
          tipo: 'TITULAR',
          entidad: 'SUNAT',
        },
        {
          asistio: false,
          tipoDocumento: 'DNI',
          numeroDocumento: '09954545',
          nombres: 'CESAR VERGARA MESA',
          tipo: 'TITULAR',
          entidad: 'INDECOPI',
        },
        {
          asistio: true,
          tipoDocumento: 'DNI',
          numeroDocumento: '45454545',
          nombres: 'CARLOS ZAMBRANO ARENAZA',
          tipo: 'TITULAR',
          entidad: 'INDECOPI',
        });

    }, 800);


    this.actaForm = this.fb.group({
      numeroActa: ['', Validators.required],
      fechaActa: ['', Validators.required],
      adjuntoActa: [''],
    });

    this.actaForm.controls.numeroActa.disable();
    this.actaForm.controls.fechaActa.disable();
    this.verificarcookies();
  }

  guardar() {
    console.log(this.firmanteList);
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      Swal.fire(editConfig).then((result) => {
        this.router.navigate(['/panel/seguimiento-de-acuerdos']);
      });
    }, 800);
  }

  cancelar() {
    this.location.back();
  }
  verificarcookies() {
    if (!Cookie.get('inforegioncodigo') ) {
      this.router.navigate(['/login']);
    }
  }

}

