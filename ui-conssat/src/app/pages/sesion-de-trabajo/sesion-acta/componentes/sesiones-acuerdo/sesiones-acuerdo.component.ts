import { Component, Input, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTable } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AcuerdoRow } from '../../../model/acuerdoRow';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { AcuerdoActaSesionResponse, EntidadAcuerdoActaResponse } from 'src/app/dto/response/AcuerdoActaSesion.response';
import { SesionTrabajoService } from 'src/app/services/sesion-trabajo.service';
import { saveConfig } from 'src/app/services/sweetAlertConfig';
import { FijasService } from 'src/app/services/fijas.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-sesiones-acuerdo',
  templateUrl: './sesiones-acuerdo.component.html',
  styleUrls: ['./sesiones-acuerdo.component.scss']
})
export class SesionesAcuerdoComponent implements OnInit {

  @Input() idActaInicio: number;
  @Input() idSesion: number;
  @Input() flagBotonGrabar: boolean;

  entidades = [];

  // @Input()
  acuerdosForm: FormGroup;

  // @Input()
  dataSource: AcuerdoActaSesionResponse[] = [];

  columnas: string[] = ['item', 'descripcion', 'responsable', 'entidad', 'fechaLimite', 'eliminar'];

  // @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor(private spinnerService: NgxSpinnerService, private fb: FormBuilder,
    @Inject(SesionTrabajoService) private sesionTrabajoService: SesionTrabajoService,
    @Inject(ValidationService) private validationService: ValidationService,
    @Inject(FijasService) private fijasService: FijasService,
    private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.acuerdosForm = this.fb.group({
      descripcion: ['', Validators.required],
      responsable: ['', Validators.required],
      entidad: ['', Validators.required],
      fechaLimite: ['', Validators.required],
    });
    // if (this.acuerdosList.length > 0) {
    //   this.table.renderRows();
    // }

    this.listarEntidades();
    this.listarAcuerdosActa();
  }

  eliminarRowAcuerdo(index: any) {
    this.spinnerService.show();
    this.sesionTrabajoService.eliminarAcuerdoActaSesionTrabajo(index).subscribe(
      (data: AcuerdoActaSesionResponse) => {
        console.log(data);
        setTimeout(() => {
          // this.acuerdosList.splice(index, 1);
          // this.table.renderRows();
          this.spinnerService.hide();
          Swal.fire({
            title: 'Eliminación!',
            text: 'Se eliminó el registro correctamente el ' + index,
            confirmButtonText: 'Continuar'
          });
          this.listarAcuerdosActa();
        }, 800);
      },
      error => {
        console.log(error);
      }
    )
  }





  agregarAcuerdo() {
    console.log(this.idActaInicio);

    // const pipe = new DatePipe('en-US');
    // const now = acuerdosForm.controls.fechaLimite.value;
    // const fechaLimite = pipe.transform(now, 'shortDate');

    // const row = {
    //   descripcion: acuerdosForm.controls.descripcion.value,
    //   responsable: acuerdosForm.controls.responsable.value,
    //   entidad: acuerdosForm.controls.entidad.value,
    //   fechaLimite: fechaLimite.toString()
    // };
    // this.acuerdosList.push(row);
    // this.table.renderRows();

    let formData = new FormData();
    formData.append('actafk', this.idActaInicio + '');
    formData.append('vResponsable', this.acuerdosForm.get('responsable').value);
    formData.append('vDesacuerdo', this.acuerdosForm.get('descripcion').value);
    formData.append('entidadfk', this.acuerdosForm.get('entidad').value);
    formData.append('dFecatencion', this.datePipe.transform(this.acuerdosForm.get('fechaLimite').value, 'dd-MM-yyyy'));

    this.spinnerService.show();
    console.log('FORM DATA');
    console.log(formData);
    this.sesionTrabajoService.registrarAcuedoActaSesionTrabajo(formData).subscribe(
      (data: AcuerdoActaSesionResponse) => {
        console.log(data);
        this.spinnerService.hide();
        Swal.fire(saveConfig).then((result) => {
          // this.router.navigate(['/panel/consejeros']);
        });
        this.listarAcuerdosActa();
        this.validationService.setAsUntoched(this.acuerdosForm);
      }, error => {
        console.log(error);
      }
    );

  }

  listarAcuerdosActa() {
    //LLAMAR A SERVICIO
    this.sesionTrabajoService.listarAcuerdoActaSesionTrabajo(this.idSesion).subscribe(
      (data: AcuerdoActaSesionResponse[]) => {
        console.log(data);
        this.dataSource = data;
      },
      error => {
        console.log(error);
      }
    )

    //dataSource
  }

  listarEntidades() {
    //LLAMAR A SERVICIO
    this.fijasService.listarEntidades().subscribe(
      (data: EntidadAcuerdoActaResponse[]) => {
        console.log(data);
        this.entidades = data;

      },
      error => {
        console.log(error);
      }
    )

    //dataSource
  }

}
