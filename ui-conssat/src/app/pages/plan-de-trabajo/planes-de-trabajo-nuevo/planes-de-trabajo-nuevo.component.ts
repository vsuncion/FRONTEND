import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { saveConfig } from '../../../services/sweetAlertConfig';
import { PlanTrabajoService } from 'src/app/services/plan-trabajo.service';
import { PlanTrabajoResponse } from 'src/app/dto/response/PlanTrabajo.response';
import { DatePipe } from '@angular/common';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { MatDialog } from '@angular/material';
import { BuscarComisionComponent } from '../../informes-anuales/informes-anuales-nuevo/buscar-comision/buscar-comision.component';
import { ComisionResponse } from 'src/app/dto/response/Comision.response';

@Component({
  selector: 'app-planes-de-trabajo-nuevo',
  templateUrl: './planes-de-trabajo-nuevo.component.html',
  styleUrls: ['./planes-de-trabajo-nuevo.component.scss']
})
export class PlanesDeTrabajoNuevoComponent implements OnInit {

  private selectedfile: File;
  private selectedfile2: File;
  planDeTrabajoForm: FormGroup;

  constructor(private fb: FormBuilder, private spinnerService: NgxSpinnerService, private router: Router,
              @Inject(PlanTrabajoService) private planTrabajoService: PlanTrabajoService,
              private datePipe: DatePipe,
              public comisiones: MatDialog) {
  }

  ngOnInit() {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      // INICIA EL FORMUALRIO AQUI
    }, 800);

    this.planDeTrabajoForm = this.fb.group({
      comision: [{ value: '', disabled: true }, Validators.required], // preguntar a vladi en q campo de request se utiliza
      fechaAprobacion: ['', Validators.required],
      fechaInicioVigencia: ['', Validators.required],
      fechaFinVigencia: ['', Validators.required],
      documentoAprobacion: ['', Validators.required],
      adjuntoDocumentoAprobacion: [''],
      adjuntoPlanTrabajo: ['', Validators.required],
    });
    this.verificarcookies();
  }

  guardar() {
    const formData = new FormData();
    formData.append('docaprobacion', this.selectedfile);
    formData.append('docplantrabajo', this.selectedfile2);
    formData.append('comisionfk', this.planDeTrabajoForm.get('comision').value); // preguntar a vladi de donde biene esa llave foranea
    formData.append('dFecaprobacion', this.datePipe.transform(this.planDeTrabajoForm.get('fechaAprobacion').value, 'dd-MM-yyyy'));
    formData.append('dFecinicio', this.datePipe.transform(this.planDeTrabajoForm.get('fechaInicioVigencia').value, 'dd-MM-yyyy'));
    formData.append('dFecfin', this.datePipe.transform(this.planDeTrabajoForm.get('fechaFinVigencia').value, 'dd-MM-yyyy'));
    formData.append('vNumdocapr', this.planDeTrabajoForm.get('documentoAprobacion').value);

    this.spinnerService.show();
    console.log('FORM DATA');
    console.log(formData);
    this.planTrabajoService.registrarPlanTrabajo(formData).subscribe(
      (data: PlanTrabajoResponse) => {
        console.log(data);
        setTimeout(() => {
          this.spinnerService.hide();
          Swal.fire(saveConfig).then((result) => {
            this.router.navigate(['/panel/planes-de-trabajo']);
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
    this.router.navigate(['/panel/planes-de-trabajo']);

  }


  selectedFileDocPlanDeTrabajo($event) {
    this.selectedfile = $event.target.files[0];

  }

  selectedFileDocAprobacion($event) {
    this.selectedfile2 = $event.target.files[0];

  }
  verificarcookies() {
    if (!Cookie.get('inforegioncodigo')) {
      this.router.navigate(['/login']);
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
        this.planDeTrabajoForm.get('comision').setValue(result.vCodcomision);
        // this.listarAsistenciaSesionTrabajo()
      }
    });
  }

  verificarrol() {
    if (Cookie.get('idrol') === 'ROLE_OPECONSSAT' || Cookie.get('idrol') === 'ROLE_OPECORSSAT') {
       return true;
    } else {
      return false;
    }
  }
}
