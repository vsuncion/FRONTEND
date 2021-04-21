import {Component, OnInit, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {saveConfig} from '../../../services/sweetAlertConfig';
import { SesionTrabajoService } from 'src/app/services/sesion-trabajo.service';
import { DatePipe } from '@angular/common';
import { SesionTrabajoResponse } from 'src/app/dto/response/SesionTrabajo.response';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { MatDialog } from '@angular/material';
import { BuscarComisionComponent } from '../../informes-anuales/informes-anuales-nuevo/buscar-comision/buscar-comision.component';
import { ComisionResponse } from 'src/app/dto/response/Comision.response';

@Component({
  selector: 'app-sesiones-de-trabajo-nuevo',
  templateUrl: './sesiones-de-trabajo-nuevo.component.html',
  styleUrls: ['./sesiones-de-trabajo-nuevo.component.scss']
})
export class SesionesDeTrabajoNuevoComponent implements OnInit {

  sesionesTipo = [
    {codigo: 1, descripcion: 'Ordinaria'},
    {codigo: 2, descripcion: 'Extraordinaria'},
  ];

  sesionDeTrabajoForm: FormGroup;

  constructor(private fb: FormBuilder, private spinnerService: NgxSpinnerService, private router: Router,
              @Inject(SesionTrabajoService) private sesionTrabajoService: SesionTrabajoService,
              private datePipe: DatePipe, public comisiones: MatDialog) {
  }

  ngOnInit() {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      // INICIA EL FORMUALRIO AQUI
    }, 800);

    this.sesionDeTrabajoForm = this.fb.group({
      tipoSesion: ['', Validators.required],
      fechaSesion: ['', Validators.required],
      horaInicio: ['', Validators.required],
      horaTermino: ['', Validators.required],
      comision: [''],
    });
    this.verificarcookies();
  }

  guardar() {
    const formData = new FormData();
    formData.append('consejofk', ''); // preguntar a vladi de donde viene??? numeroSesion
    formData.append('cOmisionfk', this.sesionDeTrabajoForm.get('comision').value);
    formData.append('tiposesion', this.sesionDeTrabajoForm.get('tipoSesion').value);
    formData.append('dFecreacion', this.datePipe.transform(this.sesionDeTrabajoForm.get('fechaSesion').value, 'dd-MM-yyyy'));
    formData.append('dHorinicio', this.sesionDeTrabajoForm.get('horaInicio').value);
    formData.append('dHorfin', this.sesionDeTrabajoForm.get('horaTermino').value);
    formData.append('codusuario', ''); // preguntar a vladi


    this.spinnerService.show();
    this.sesionTrabajoService.registrarSesionTrabajo(formData).subscribe(
      (data: SesionTrabajoResponse) => {
        console.log(data);
        setTimeout(() => {
          this.spinnerService.hide();
          Swal.fire(saveConfig).then((result) => {
            this.router.navigate(['/panel/sesiones-de-trabajo']);
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
    this.router.navigate(['/panel/sesiones-de-trabajo']);

  }
  verificarcookies() {
    if (!Cookie.get('inforegioncodigo') ) {
      this.router.navigate(['/login']);
    }
  }
  bloquearcomision() {
    if (Cookie.get('inforegioncodigo') === 'ROLE_OPECONSSAT' || Cookie.get('inforegioncodigo') === 'ROLE_OPECORSSAT' ) {
       return true;
     } else {
      return false;
    }
  }
  verificarrol() {
    if (Cookie.get('idrol') === 'ROLE_OPECONSSAT' || Cookie.get('idrol') === 'ROLE_OPECORSSAT') {
       return true;
    } else {
      return false;
    }
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
        this.sesionDeTrabajoForm.get('comision').setValue(result.vCodcomision);
        // this.listarAsistenciaSesionTrabajo()
      }
    });
  }
}
