import {Component, OnInit, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {Router, ActivatedRoute} from '@angular/router';
import {Location, DatePipe} from '@angular/common';
import Swal from 'sweetalert2';
import {editConfig, saveConfig} from '../../../services/sweetAlertConfig';
import { InformesGestionService } from 'src/app/services/informes- gestion.service';
import { InformeAnualResponse } from 'src/app/dto/response/InformeAnual.response';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { MatDialog } from '@angular/material';
import { BuscarNroSesionComponent } from '../informes-anuales-nuevo/buscar-nro-sesion/buscar-nro-sesion.component';
import { SesionTrabajoResponse } from 'src/app/dto/response/SesionTrabajo.response';
import { BuscarComisionComponent } from '../informes-anuales-nuevo/buscar-comision/buscar-comision.component';
import { ComisionResponse } from 'src/app/dto/response/Comision.response';

@Component({
  selector: 'app-informes-anuales-editar',
  templateUrl: './informes-anuales-editar.component.html',
  styleUrls: ['./informes-anuales-editar.component.scss']
})
export class InformesAnualesEditarComponent implements OnInit {
  private sub: any;
  id: number;
  informeAnual: any;

  private archivoAdjunto: File;

  informeForm: FormGroup;

  constructor(private fb: FormBuilder, private spinnerService: NgxSpinnerService, private router: Router, private location: Location,
              private route: ActivatedRoute, public nroSesiones: MatDialog,
              private datePipe: DatePipe, public comisiones: MatDialog,
              @Inject(InformesGestionService) private informesGestionService: InformesGestionService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params.id;
    });

    this.spinnerService.show();
    this.informeForm = this.fb.group({
      comision: [''],
      numeroInforme: ['', Validators.required],
      numeroSesion: ['', Validators.required],
      fecha: ['', Validators.required],
      docAprobacion: ['', Validators.required],
      adjunto: ['', Validators.required],
    });


    this.verificarcookies();
    this.obtenerInformeAnual();
  }

  obtenerInformeAnual() {
    this.informesGestionService.buscarInformeAnualPorId(this.id).subscribe(
      (data: InformeAnualResponse) => {
        console.log('BUSQUEDA POR ID');
        console.log(data);
        this.informeAnual = data;
        this.informeForm.setValue({
          comision: data.comision,
          numeroInforme: data.vCodinforme,
          numeroSesion: data.vSesion,
          fecha: data.dFecdesde ? new Date(data.dFecdesde.toString().replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3')) : '',
          docAprobacion: data.vNumdocap,
          adjunto: data.vNombreArchivo + '.' + data.vExtension,
        });
        this.spinnerService.hide();
      }, error => {
        console.log(error);
        this.spinnerService.hide();
      }
    );
  }



  guardar() {
    const formData = new FormData();
    formData.append('iNformeidpk', this.id + '');
    formData.append('vCodinforme', this.informeForm.get('numeroInforme').value);
    formData.append('vSesion', this.informeForm.get('numeroSesion').value);
    formData.append('vNumdocap', this.informeForm.get('docAprobacion').value);
    formData.append('comision', this.informeForm.get('comision').value);
    formData.append('dFecdesde', this.datePipe.transform(this.informeForm.get('fecha').value, 'dd-MM-yyyy'));
    formData.append('docboletin', this.archivoAdjunto);


    this.spinnerService.show();
    this.informesGestionService.actualizarInformeAnual(formData).subscribe(
      (data: InformeAnualResponse) => {
        console.log(data);
        setTimeout(() => {
          this.spinnerService.hide();
          Swal.fire(editConfig).then((result) => {
            this.router.navigate(['/panel/informes-anuales']);
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
    this.router.navigate(['/panel/informes-anuales']);
  }

  selectedFileDocAprobacion($event) {
    this.archivoAdjunto = $event.target.files[0];
  }
  verificarcookies() {
    if (!Cookie.get('inforegioncodigo') ) {
      this.router.navigate(['/login']);
    }
  }
  verificarrol() {
    if (Cookie.get('idrol') === 'ROLE_OPECONSSAT' || Cookie.get('idrol') === 'ROLE_OPECORSSAT') {
       return true;
    } else {
      return false;
    }
  }

  buscarNroSesiones() {
    const dialogRef = this.nroSesiones.
      open(BuscarNroSesionComponent, {
        width: '900px',
        disableClose: true,
        data: {
          // idSesion: this.id,
        }
      });

    dialogRef.afterClosed().subscribe((result: SesionTrabajoResponse) => {
      if (result != null) {
        console.log(result);
        this.informeForm.get('numeroSesion').setValue(result.vCodsesion);
        // this.listarAsistenciaSesionTrabajo()
      }
    });
  }

  buscarComision() {
    const dialogRef = this.comisiones.
      open(BuscarComisionComponent, {
        width: '900px',
        disableClose: true,
        data: {
          // idSesion: this.id,
        }
      });

    dialogRef.afterClosed().subscribe((result: ComisionResponse) => {
      if (result != null) {
        console.log(result);
        this.informeForm.get('comision').setValue(result.vCodcomision);
        // this.listarAsistenciaSesionTrabajo()
      }
    });
  }
}
