import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { saveConfig, decargaConfig, errorConfig } from '../../../../services/sweetAlertConfig';
import { AsistenciaSesionTrabajoResponse } from 'src/app/dto/response/AsistenciaSesionTrabajo.response';
import { SesionTrabajoService } from 'src/app/services/sesion-trabajo.service';
import { SesionTrabajoResponse } from 'src/app/dto/response/SesionTrabajo.response';
import { MatDialog } from '@angular/material';
import { RegistroAsistenteComponent } from './registro-asistente/registro-asistente.component';
import { InformacionAsistenteComponent } from './informacion-asistente/informacion-asistente.component';
import { AdjuntarArchivoResponse } from 'src/app/dto/response/AdjuntarArchivo.response';
import { HttpResponse } from '@angular/common/http';

interface ParticipanteRow {
  id: number;
  participa: boolean;
  tipoDocumento: string;
  numero: string;
  nombres: string;
  entidad: string;
  entrada: string;
  salida: string;
}


@Component({
  selector: 'app-sesiones-asistencia-nuevo',
  templateUrl: './sesiones-asistencia-nuevo.component.html',
  styleUrls: ['./sesiones-asistencia-nuevo.component.scss']
})
export class SesionesAsistenciaNuevoComponent implements OnInit {
  private sub: any;
  id: number;

  PARTICIPANTES: AsistenciaSesionTrabajoResponse[] = [];

  dataSource = this.PARTICIPANTES;
  displayedColumns: string[] = ['item', 'participa', 'tipoDocumento', 'numero', 'nombres', 'entidad', 'entrada', 'salida'];

  sesionesTipo = [
    { codigo: 1, descripcion: 'Ordinaria' },
    { codigo: 2, descripcion: 'Extraordinaria' },
  ];

  sesionDeTrabajoForm: FormGroup;

  adjuntarListaForm: FormGroup;

  private selectedfile1: File;

  existArchivoAsistentes = false;

  constructor(public asistente: MatDialog, private fb: FormBuilder, private spinnerService: NgxSpinnerService, private router: Router,
              private route: ActivatedRoute,
              @Inject(SesionTrabajoService) private sesionTrabajoService: SesionTrabajoService) {
  }

  ngOnInit() {
    this.spinnerService.show();
    this.sub = this.route.params.subscribe(params => {
      this.id = +params.id;
    });
    console.log('id de la sesion');
    console.log(this.id);

    this.sesionDeTrabajoForm = this.fb.group({
      numeroSesion: ['', Validators.required],
      tipoSesion: ['', Validators.required],
      fechaSesion: ['', Validators.required],
      horaInicio: ['', Validators.required],
      horaTermino: ['', Validators.required],
    });
    this.sesionDeTrabajoForm.disable();

    this.adjuntarListaForm = this.fb.group({
      descargarLista: ['', Validators.required],
      nombreLista: ['', []],
    });

    this.AsistenciaSesionTrabajoPorId();
    this.listarAsistenciaSesionTrabajo();
    this.consultarArchivoAsistentes();
  }

  abrirRegistroAsistente() {
    const dialogRef = this.asistente.open(RegistroAsistenteComponent, {
      width: '900px',
      disableClose: true,
      data: {
        idSesion: this.id,
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.listarAsistenciaSesionTrabajo();
      }
    });
  }

  abrirIformacionAsistente(obj: AsistenciaSesionTrabajoResponse) {
    const index = this.dataSource.indexOf(obj);

    const dialogRef = this.asistente.open(InformacionAsistenteComponent, {
      width: '900px',
      disableClose: true,
      data: obj
    });

    dialogRef.afterClosed().subscribe((result) => {

      this.listarAsistenciaSesionTrabajo();

    });
  }

  // loadDatosDeSesion() {
  //   this.spinnerService.show();
  //   setTimeout(() => {
  //     // INICIA EL FORMUALRIO AQUI
  //     this.sesionDeTrabajoForm.setValue({
  //       numeroSesion: '90898990',
  //       tipoSesion: '02',
  //       fechaSesion: new Date(),
  //       horaInicio: '3:00 pm',
  //       horaTermino: '4:00 pm',
  //     });
  //     this.spinnerService.hide();
  //   }, 800);
  // }

  // para la cabecera
  AsistenciaSesionTrabajoPorId() {
    this.spinnerService.show();
    this.sesionTrabajoService.buscarAsistenciaSesionTrabajoPorId(this.id).subscribe(
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
        this.spinnerService.hide();
      }, error => {
        console.log(error);
        this.spinnerService.hide();
      }
    );
  }

  guardar() {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      Swal.fire(saveConfig).then((result) => {
        this.router.navigate(['/panel/sesiones-de-trabajo']);
      });
    }, 800);
  }

  cancelar() {
    this.router.navigate(['/panel/sesiones-de-trabajo']);
  }

  listarAsistenciaSesionTrabajo() {
    // LLAMAR A SERVICIO
    this.spinnerService.show();
    this.sesionTrabajoService.listarAsistenciaSesionTrabajo(this.id).subscribe(
      (data: AsistenciaSesionTrabajoResponse[]) => {
        console.log(data);
        this.dataSource = data;
        this.spinnerService.hide();
      },
      error => {
        console.log(error);
      }
    );

    // dataSource
  }

  selectedFileDoc1($event) {
    this.selectedfile1 = $event.target.files[0];
    this.guardarLista();
  }

  guardarLista() {
    const formData = new FormData();
    formData.append('docasistencia', this.selectedfile1);
    formData.append('sesioncodigo', this.id + '');

    this.spinnerService.show();
    console.log('FORM DATA');
    console.log(formData);
    this.sesionTrabajoService.adjuntarListaAsistencia(formData).subscribe(
      (data: AdjuntarArchivoResponse) => {
        console.log(data);

        this.spinnerService.hide();
        Swal.fire(saveConfig).then((result) => {

        });

      }, error => {
        console.log(error);
      }
    );
  }

  descargarArchivo() {
    this.spinnerService.show();
    this.sesionTrabajoService.decargarDocAsistentes(this.id).subscribe(
      (data: HttpResponse<Blob>) => {
        console.log('aqui estoy imprimiendo la data');
        console.log(data);
        this.spinnerService.hide();
        this.sesionTrabajoService.descargarArchivo(data.body);
      },
      error => {
        console.error(error);
        Swal.fire(errorConfig);
      });
  }

  consultarArchivoAsistentes() {
    console.log('INGRESO VERIFICACION SISTENTES');
    this.sesionTrabajoService.verificarDocAsistentes(this.id).subscribe(
      (data: any) => {
        if (data) {
          if (data.nOmbrearchivo) {
            this.existArchivoAsistentes = true;
            this.adjuntarListaForm.get('nombreLista').setValue(data.nOmbrearchivo + '.' + data.eXtensionarchivo);
          } else {
            this.existArchivoAsistentes = false;
          }
        } else {
          this.existArchivoAsistentes = false;
        }
      },
      error => {
        console.error(error);
        this.existArchivoAsistentes = false;
      });
  }

}
