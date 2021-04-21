import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Location, DatePipe } from '@angular/common';
import { saveConfig } from '../../../services/sweetAlertConfig';
import { InformesGestionService } from 'src/app/services/informes- gestion.service';
import { InformeAnualResponse } from 'src/app/dto/response/InformeAnual.response';
import { MatDialog } from '@angular/material';
import { BuscarComisionComponent } from './buscar-comision/buscar-comision.component';
import { BuscarNroSesionComponent } from './buscar-nro-sesion/buscar-nro-sesion.component';
import { SesionTrabajoResponse } from 'src/app/dto/response/SesionTrabajo.response';
import { ComisionResponse } from 'src/app/dto/response/Comision.response';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-informes-anuales-nuevo',
  templateUrl: './informes-anuales-nuevo.component.html',
  styleUrls: ['./informes-anuales-nuevo.component.scss']
})
export class InformesAnualesNuevoComponent implements OnInit {


  private archivoAdjunto: File;

  informeForm: FormGroup;

  constructor(public comisiones: MatDialog, public nroSesiones: MatDialog, private fb: FormBuilder,
              private spinnerService: NgxSpinnerService, private router: Router, private location: Location,
              private datePipe: DatePipe,
              @Inject(InformesGestionService) private informesGestionService: InformesGestionService) {
  }

  ngOnInit() {
    this.informeForm = this.fb.group({
      comision: [{value: '', disabled: true}, Validators.required],
      numeroInforme: ['', Validators.required],
      numeroSesion: ['', Validators.required],
      fecha: ['', Validators.required],
      docAprobacion: ['', Validators.required],
      adjunto: ['', Validators.required],
    });
    this.verificarcookies();
  }

  // guardar() {
  //   this.spinnerService.show();
  //   setTimeout(() => {
  //     this.spinnerService.hide();
  //     Swal.fire(saveConfig)
  //       .then((result) => {
  //         this.location.back();
  //       });
  //   }, 800);

  // }

  guardar() {
    const formData = new FormData();
    formData.append('vCodinforme', this.informeForm.get('numeroInforme').value);
    formData.append('vSesion', this.informeForm.get('numeroSesion').value);
    formData.append('vNumdocap', this.informeForm.get('docAprobacion').value);
    formData.append('comision', this.informeForm.get('comision').value);
    formData.append('dFecdesde', this.datePipe.transform(this.informeForm.get('fecha').value, 'dd-MM-yyyy'));
    formData.append('docboletin', this.archivoAdjunto);


    this.spinnerService.show();
    this.informesGestionService.registrarInformeAnual(formData).subscribe(
      (data: InformeAnualResponse) => {
        console.log(data);
        setTimeout(() => {
          this.spinnerService.hide();
          Swal.fire(saveConfig).then((result) => {
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
    this.location.back();
  }

  selectedFileDocAprobacion($event) {
    this.archivoAdjunto = $event.target.files[0];
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
}
