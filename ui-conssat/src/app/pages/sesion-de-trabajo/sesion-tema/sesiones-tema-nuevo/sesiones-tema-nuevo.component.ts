import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { saveConfig, deleteConfig } from '../../../../services/sweetAlertConfig';
import { SesionTrabajoService } from 'src/app/services/sesion-trabajo.service';
import { TemaSesionTrabajoResponse, TipoTemas } from 'src/app/dto/response/TemasSesionTrabajo.response';
import { SesionTrabajoResponse } from 'src/app/dto/response/SesionTrabajo.response';
import { ValidationService } from 'src/app/services/validation.service';
import { FijasService } from 'src/app/services/fijas.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { HttpResponse } from '@angular/common/http';

interface TemaRow {
  id: number;
  tipo: string;
  descripcion: string;
  adjunto1: boolean;
  adjunto2: boolean;
  adjunto3: boolean;
}


@Component({
  selector: 'app-sesiones-tema-nuevo',
  templateUrl: './sesiones-tema-nuevo.component.html',
  styleUrls: ['./sesiones-tema-nuevo.component.scss']
})
export class SesionesTemaNuevoComponent implements OnInit {
  private sub: any;
  id: number;

  private selectedfile1: File;
  private selectedfile2: File;
  private selectedfile3: File;

  TEMAS: TemaRow[] = [
    {
      id: 1,
      tipo: 'INFORME',
      descripcion: 'TEMA PRUEBA 1',
      adjunto1: false,
      adjunto2: true,
      adjunto3: true,
    }
  ];

  dataSource = [];
  displayedColumns: string[] = ['item', 'tipo', 'descripcion', 'adjunto1', 'adjunto2', 'adjunto3', 'eliminar'];

  tiposSesion = [
    { codigo: 1, descripcion: 'Ordinaria' },
    { codigo: 2, descripcion: 'Extraordinaria' },
  ];

  tiposTema = [
    // { codigo: 1, descripcion: '(I)nforme' },
    // { codigo: 2, descripcion: '(P)edido' },
    // { codigo: 3, descripcion: '(O)rdern del día' },
  ];

  sesionDeTrabajoForm: FormGroup;
  temaForm: FormGroup;

  constructor(private fb: FormBuilder,
              private spinnerService: NgxSpinnerService,
              private router: Router,
              private route: ActivatedRoute,
              private location: Location,
              @Inject(SesionTrabajoService) private sesionTrabajoService: SesionTrabajoService,
              @Inject(ValidationService) private validationService: ValidationService,
              @Inject(FijasService) private fijasService: FijasService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    console.log('id de la sesion');
    console.log(this.id);

    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      // INICIA EL FORMUALRIO AQUI

      // this.sesionDeTrabajoForm.setValue({
      //   numeroSesion: '90898990',
      //   tipoSesion: '02',
      //   fechaSesion: new Date(),
      //   horaInicio: '3:00 pm',
      //   horaTermino: '4:00 pm',
      // });

      this.sesionDeTrabajoForm.disable();
    }, 800);

    this.sesionDeTrabajoForm = this.fb.group({
      numeroSesion: ['', Validators.required],
      tipoSesion: ['', Validators.required],
      fechaSesion: ['', Validators.required],
      horaInicio: ['', Validators.required],
      horaTermino: ['', Validators.required],
    });

    this.temaForm = this.fb.group({
      tipoTema: ['', Validators.required],
      descripcion: ['', Validators.required],
      adjunto1: [''],
      adjunto2: [''],
      adjunto3: [''],
    });

    this.obtenerTemaSesionTrabajo();
    this.listarAsistenciaSesionTrabajo();
    this.listarTipoTema();
    this.verificarcookies();
  }

  // cabecera
  obtenerTemaSesionTrabajo() {
    this.sesionTrabajoService.buscarTemaSesionTrabajoPorId(this.id).subscribe(
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

  guardar() {
    let formData = new FormData();
    formData.append('docAdjunto1', this.selectedfile1);
    formData.append('docAdjunto2', this.selectedfile2);
    formData.append('docAdjunto3', this.selectedfile3);
    formData.append('sEsionfk', this.id + '');
    formData.append('tIpotemafk', this.temaForm.get('tipoTema').value);
    formData.append('vDescripcion', this.temaForm.get('descripcion').value);

    this.spinnerService.show();
    console.log('FORM DATA');
    console.log(formData);
    this.sesionTrabajoService.registrarTemaSesionTrabajo(formData).subscribe(
      (data: TemaSesionTrabajoResponse) => {
        console.log(data);
        this.spinnerService.hide();
        Swal.fire(saveConfig).then((result) => {
          this.listarAsistenciaSesionTrabajo();
        });
        this.validationService.setAsUntoched(this.temaForm);

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
    this.location.back();
  }

  eliminarRowTema(idTema: any) {
    this.spinnerService.show();

    this.sesionTrabajoService.eliminarTemaSesionTrabajo(idTema).subscribe(
      (data: TemaSesionTrabajoResponse) => {
        console.log(data);
        setTimeout(() => {
          this.spinnerService.hide();
          Swal.fire(deleteConfig).then((result) => {
            this.listarAsistenciaSesionTrabajo();
          });
        }, 800);
      },
      error => {
        console.log(error);
      }
    );
  }

  listarAsistenciaSesionTrabajo() {
    // LLAMAR A SERVICIO
    this.sesionTrabajoService.listarTemaSesionTrabajo(this.id).subscribe(
      (data: TemaSesionTrabajoResponse[]) => {
        console.log(data);
        this.dataSource = data;
      },
      error => {
        console.log(error);
        this.spinnerService.hide();
        Swal.fire({
          icon: 'error',
          title: error.error.error,
          text: error.error.message
        });
      }
    );

    // dataSource
  }

  selectedFileDoc1($event) {
    this.selectedfile1 = $event.target.files[0];
  }

  selectedFileDoc2($event) {
    this.selectedfile2 = $event.target.files[0];
  }

  selectedFileDoc3($event) {
    this.selectedfile3 = $event.target.files[0];
  }

  listarTipoTema() {
    this.fijasService.listarTipoTemas().subscribe(
      (data: TipoTemas[]) => {
        console.log(data);
        this.tiposTema = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  descargarArchivo1(id: number) {
    this.spinnerService.show();
    this.sesionTrabajoService.descargarDocTema1(id).subscribe(
      (data: HttpResponse<Blob>) => {
        this.spinnerService.hide();
        this.sesionTrabajoService.descargarArchivo(data.body);
      }, error => {
        console.log(error);
      }
    );
  }

  descargarArchivo2(id: number) {
    this.spinnerService.show();
    this.sesionTrabajoService.descargarDocTema2(id).subscribe(
      (data: HttpResponse<Blob>) => {
        this.spinnerService.hide();
        this.sesionTrabajoService.descargarArchivo(data.body);
      }, error => {
        console.log(error);
      }
    );
  }

  descargarArchivo3(id: number) {
    this.spinnerService.show();
    this.sesionTrabajoService.descargarDocTema3(id).subscribe(
      (data: HttpResponse<Blob>) => {
        this.spinnerService.hide();
        this.sesionTrabajoService.descargarArchivo(data.body);
      }, error => {
        console.log(error);
      }
    );
  }

  verificarcookies() {
    if (!Cookie.get('inforegioncodigo') ) {
      this.router.navigate(['/login']);
    }
  }

}
