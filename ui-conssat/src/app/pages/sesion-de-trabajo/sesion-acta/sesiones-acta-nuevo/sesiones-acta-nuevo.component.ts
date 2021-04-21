import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { FirmanteRow } from '../../model/firmanteRow';
import { AcuerdoRow } from '../../model/acuerdoRow';
import { Location, DatePipe } from '@angular/common';
import { saveConfig } from '../../../../services/sweetAlertConfig';
import { SesionTrabajoService } from 'src/app/services/sesion-trabajo.service';
import { SesionTrabajoResponse } from 'src/app/dto/response/SesionTrabajo.response';
import { ActaSesionTrabajoResponse } from 'src/app/dto/response/ActaSesionTrabajo.response';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { HttpResponse } from '@angular/common/http';
import { FirmantesResponse } from 'src/app/dto/response/Firmantes.response';

@Component({
  selector: 'app-sesiones-acta-nuevo',
  templateUrl: './sesiones-acta-nuevo.component.html',
  styleUrls: ['./sesiones-acta-nuevo.component.scss']
})
export class SesionesActaNuevoComponent implements OnInit {
  private sub: any;
  id: number;
  idActa: number;
  flagBotonGrabar = false;

  private selectedfile1: File;

  acuerdosList: AcuerdoRow[] = [];
  firmanteList: FirmantesResponse[] = [];


  sesionesTipo = [
    { codigo: 1, descripcion: 'Ordinaria' },
    { codigo: 2, descripcion: 'Extraordinaria' },
  ];

  sesionDeTrabajo: any;
  actaForm: FormGroup;

  constructor(private fb: FormBuilder,
              private spinnerService: NgxSpinnerService,
              private router: Router,
              private location: Location,
              private route: ActivatedRoute,
              @Inject(SesionTrabajoService) private sesionTrabajoService: SesionTrabajoService,
              private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params.id;
    });


    console.log(' NUEVA ACTA *********');
    this.spinnerService.show();
    setTimeout(() => {
      // INICIA EL FORMUALRIO AQUI
      this.spinnerService.hide();
    }, 800);

    this.actaForm = this.fb.group({
      numeroActa: [{value: '', disabled: true}, []],
      fechaActa: ['', Validators.required],
      adjuntoActa: [''],
      descargarActa: [''],
    });



    this.actaForm.disable();
    // this.actaForm.controls.fechaActa.disable();

    this.obtenerTemaSesionTrabajo();
    this.obtenerActaSesionTrabajo();
    this.verificarcookies();

    this.listarFirmanteActa();
  }

  obtenerTemaSesionTrabajo() {
    this.sesionTrabajoService.buscarTemaSesionTrabajoPorId(this.id).subscribe(
      (data: SesionTrabajoResponse) => {
        this.sesionDeTrabajo = data;
      }, error => {
        console.log(error);
      }
    );
  }

  guardar() {
    console.log(this.actaForm.valid);
    const formData = new FormData();
    formData.append('sesionfk', this.id + '');
    formData.append('fecha_acta', this.datePipe.transform(this.actaForm.get('fechaActa').value, 'dd-MM-yyyy'));
    formData.append('docacta', this.selectedfile1);

    this.spinnerService.show();

    this.sesionTrabajoService.registrarActaSesionTrabajo(formData).subscribe(
      (data: ActaSesionTrabajoResponse) => {
        console.log(data);
        this.idActa = data.aCtaidpk;

        this.spinnerService.hide();
        Swal.fire(saveConfig).then((result) => {
          this.obtenerActaSesionTrabajo();
          this.listarFirmanteActa();
        });
      }, error => {
        console.log(error);
        this.idActa = 0;
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

  obtenerActaSesionTrabajo() {
    this.sesionTrabajoService.buscarActaSesionTrabajoPorId(this.id).subscribe(
      (data: ActaSesionTrabajoResponse) => {
        console.log('RESULTADO DE OBTENER ACTA DE SESION');
        console.log(data);
        this.idActa = data.aCtaidpk;
        this.flagBotonGrabar = true;
        this.actaForm.setValue({
          numeroActa: data.vCodacta,
          fechaActa: data.dFecacta ? new Date(data.dFecacta.toString().replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3')) : '',
          adjuntoActa: '',
          descargarActa: data.vNombrearchivo + '.' + data.vArchivoextension
        });
        this.actaForm.disable();

      }, error => {
        console.log(error);
        this.idActa = 0;
        this.flagBotonGrabar = false;
        this.actaForm.enable();
      }
    );
  }



  selectedFileDoc1($event) {
    this.selectedfile1 = $event.target.files[0];
  }
  verificarcookies() {
    if (!Cookie.get('inforegioncodigo')) {
      this.router.navigate(['/login']);
    }
  }

  descargarArchivo() {
    this.spinnerService.show();
    this.sesionTrabajoService.descargarDocActa(this.idActa).subscribe(
      (data: HttpResponse<Blob>) => {
        this.spinnerService.hide();
        this.sesionTrabajoService.descargarArchivo(data.body);
      }, error => {
        console.log(error);
      }
    );
  }

  listarFirmanteActa() {
    // LLAMAR A SERVICIO
    this.sesionTrabajoService.listarFirmanteActaSesionTrabajo(this.id).subscribe(
      (data: FirmantesResponse[]) => {
        console.log('DATA FIRMANTE');
        console.log(data);
        this.firmanteList = data;
      },
      error => {
        console.log(error);
      }
    );

    // dataSource
  }
}
