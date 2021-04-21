import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccionRow } from '../../models/accionRow';
import { MatTable, MatDialog } from '@angular/material';
import { FileInput } from 'ngx-material-file-input';
import Swal from 'sweetalert2';
import { deleteConfig, saveConfig, decargaConfig } from '../../../../services/sweetAlertConfig';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { SeguimientoAcuerdoService } from 'src/app/services/seguimiento-acuerdo.service';
import { AccionesResponse } from 'src/app/dto/response/Acciones.response';
import { Router, ActivatedRoute } from '@angular/router';
import { SesionTrabajoService } from 'src/app/services/sesion-trabajo.service';
import { EntidadAcuerdoActaResponse } from 'src/app/dto/response/AcuerdoActaSesion.response';
import { backendUrl } from 'src/app/common';
import { FijasService } from 'src/app/services/fijas.service';
import { HttpResponse } from '@angular/common/http';
import { AccionEditarComponent } from '../accion-editar/accion-editar.component';
import { ValidationService } from 'src/app/services/validation.service';


@Component({
  selector: 'app-accion-realizada',
  templateUrl: './accion-realizada.component.html',
  styleUrls: ['./accion-realizada.component.scss']
})
export class AccionRealizadaComponent implements OnInit, OnChanges {
  private sub: any;
  idActa: number;
  idSesion: number;
  idAcuerdo: number;

  private archivoAdjunto: File;

  dataSource: AccionesResponse[] = [];

  @Input()
  accionList: AccionRow[];

  entidades = [];

  accionRealizadaForm: FormGroup;

  displayedColumns: string[] = ['nro', 'acciones', 'responsable', 'registro', 'archivo', 'ejecuto', 'fecha', 'editar', 'eliminar'];
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor(private fb: FormBuilder, private spinner: NgxSpinnerService, private spinnerService: NgxSpinnerService,
              private datePipe: DatePipe, private router: Router, private route: ActivatedRoute,
              private dialog: MatDialog,
              @Inject(SeguimientoAcuerdoService) private seguimientoAcuerdoService: SeguimientoAcuerdoService,
              @Inject(SesionTrabajoService) private sesionTrabajoService: SesionTrabajoService,
              @Inject(FijasService) private fijasService: FijasService,private validationService: ValidationService) {
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.idActa = params.idActa;
      this.idSesion = params.idSesion;
      this.idAcuerdo = +params.idAcuerdo;
    });

    console.log('Datos recuperados cesar ');
    console.log(this.idActa);
    console.log(this.idSesion);
    console.log(this.idAcuerdo);

    this.accionRealizadaForm = this.fb.group({
      accionDescripcion: ['', Validators.required],
      responsable: ['', Validators.required],
      entidad: ['', Validators.required],
      fechaEjecutara: ['', Validators.required],
      fueEjecutado: [''],
      fechaEjecuto: [''],
      adjunto: ['']
    });

    this.listarAccion();
    this.listarEntidades();
  }

  // agregarAccion() {
  //   this.accionRealizadaForm.markAllAsTouched();
  //   if (this.accionRealizadaForm.invalid) {
  //     return;
  //   }
  //   const data: AccionRow = {
  //     acciones: this.accionRealizadaForm.controls.accionDescripcion.value,
  //     responsable: this.accionRealizadaForm.controls.responsable.value,
  //     registro: new Date().toISOString(),
  //     archivo: this.getFilename(this.accionRealizadaForm.controls.adjunto.value),
  //     ejecuto: this.accionRealizadaForm.controls.fueEjecutado.value,
  //     fecha: this.getStringFroDate(this.accionRealizadaForm.controls.fechaEjecuto.value)
  //   };

  //   this.accionList.push(data);
  //   this.table.renderRows();
  //   this.accionRealizadaForm.reset();
  //   this.accionRealizadaForm.markAsTouched({onlySelf: false});

  // }

  agregarAccion() {
    const formData = new FormData();
    formData.append('idacuerdo', this.idAcuerdo + '');
    formData.append('identidad', this.accionRealizadaForm.get('entidad').value);
    formData.append('responsable', this.accionRealizadaForm.get('responsable').value);
    formData.append('descripcionaccion', this.accionRealizadaForm.get('accionDescripcion').value);
    formData.append('fecha_ejecutara', this.datePipe.transform(this.accionRealizadaForm.get('fechaEjecutara').value, 'dd-MM-yyyy'));
    formData.append('fecha_ejecuto', this.datePipe.transform(this.accionRealizadaForm.get('fechaEjecuto').value, 'dd-MM-yyyy'));
    formData.append('docaccion', this.archivoAdjunto);
    formData.append('flgejecuto', this.accionRealizadaForm.get('fueEjecutado').value === true ? 1 + '' : 0 + '');


    this.spinnerService.show();
    this.seguimientoAcuerdoService.registrarAccionRealizada(formData).subscribe(
      (data: AccionesResponse) => {
        console.log(data);
        this.spinnerService.hide();
        Swal.fire(saveConfig).then((result) => {
          this.listarAccion();
          this.limpiarRegistro();
        });
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

  listarAccion() {
    // LLAMAR A SERVICIO
    this.seguimientoAcuerdoService.listarAccionRealizada(this.idAcuerdo).subscribe(
      (data: AccionesResponse[]) => {
        console.log(data);
        this.dataSource = data;
      },
      error => {
        console.log(error);
      }
    );

    // dataSource
  }

  getFilename(file: FileInput) {
    console.log(file);
    if (file !== undefined && file.files !== undefined && file.files.length > 0) {
      return file.files[0].name;
    } else {
      return '';
    }
  }

  getStringFroDate(fecha) {
    return fecha !== undefined ? fecha.toLocaleString() : '';
  }

  selectedFileDocAprobacion($event) {
    this.archivoAdjunto = $event.target.files[0];
  }

  eliminarAccion(id: number) {
    this.spinnerService.show();

    this.seguimientoAcuerdoService.eliminarAccionRealizada(id).subscribe(
      (data: AccionesResponse) => {
        console.log(data);
        this.spinnerService.hide();
        Swal.fire(deleteConfig);
        this.listarAccion();
      },
      error => {
        console.log(error);
      }
    );
  }

  listarEntidades() {
    // LLAMAR A SERVICIO

    console.log('este esta llamando');
    this.fijasService.listarEntidades().subscribe(
      (data: EntidadAcuerdoActaResponse[]) => {
        console.log(data);
        this.entidades = data;

      },
      error => {
        console.log(error);
      }
    );

    // dataSource
  }

  decargarArchivo(id: number) {
    this.spinnerService.show();
    this.seguimientoAcuerdoService.descargarDocAcuerdo(id).subscribe(
      (data: HttpResponse<Blob>) => {
        this.spinnerService.hide();
        this.seguimientoAcuerdoService.descargarArchivo(data.body);
      }, error => {
        console.log(error);
      }
    );
  }

  editarRegistro(id: any) {
    console.log('se redirecciona componente AccionEditarComponent');
    const dialogRef = this.dialog.open(AccionEditarComponent, {
      width: '900px',
      height: '95%',
      disableClose: true,
      data: { idAccion: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        console.log(result);
        this.listarAccion();
      }
    });
  }

  limpiarRegistro() {
    this.validationService.setAsUntoched(this.accionRealizadaForm);
  }

}
