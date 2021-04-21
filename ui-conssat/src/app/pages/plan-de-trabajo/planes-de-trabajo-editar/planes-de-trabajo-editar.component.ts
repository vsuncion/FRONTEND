import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { editConfig } from '../../../services/sweetAlertConfig';
import { PlanTrabajoService } from 'src/app/services/plan-trabajo.service';
import { PlanTrabajoResponse } from 'src/app/dto/response/PlanTrabajo.response';
import { PlanTrabajoRequest } from 'src/app/dto/request/PlanTrabajo.request';
import { DatePipe } from '@angular/common';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { MatDialog } from '@angular/material';
import { BuscarComisionComponent } from '../../informes-anuales/informes-anuales-nuevo/buscar-comision/buscar-comision.component';
import { ComisionResponse } from 'src/app/dto/response/Comision.response';

@Component({
  selector: 'app-planes-de-trabajo-editar',
  templateUrl: './planes-de-trabajo-editar.component.html',
  styleUrls: ['./planes-de-trabajo-editar.component.scss']
})
export class PlanesDeTrabajoEditarComponent implements OnInit {
  private sub: any;
  id: number;
  planTrabajo: PlanTrabajoRequest;

  private selectedfile: File;
  private selectedfile2: File;
  planDeTrabajoForm: FormGroup;

  constructor(private fb: FormBuilder, private spinnerService: NgxSpinnerService, private router: Router,
              private route: ActivatedRoute,
              @Inject(PlanTrabajoService) private planTrabajoService: PlanTrabajoService,
              private datePipe: DatePipe, public comisiones: MatDialog) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params.id;
    });

    this.spinnerService.show();

    this.planDeTrabajoForm = this.fb.group({
      codigo: ['', Validators.required],
      fechaAprobacion: ['', Validators.required],
      fechaInicioVigencia: ['', Validators.required],
      fechaFinVigencia: ['', Validators.required],
      documentoAprobacion: ['', Validators.required],
      adjuntoDocumentoAprobacion: [''],
      adjuntoPlanTrabajo: ['', Validators.required],
      comision: [''],
    });

    this.obtenerPlanTrabajo();
    this.verificarcookies();
  }

  guardar() {
    const formData = new FormData();
    formData.append('pLantrabidpk', this.planTrabajo.pLantrabidpk + '');
    formData.append('codigoplan', this.planDeTrabajoForm.get('codigo').value);
    formData.append('docaprobacion', this.selectedfile);
    formData.append('docplantrabajo', this.selectedfile2);
    formData.append('comisionfk', this.planDeTrabajoForm.get('comision').value);
    formData.append('dFecaprobacion', this.datePipe.transform(this.planDeTrabajoForm.get('fechaAprobacion').value, 'dd-MM-yyyy'));
    formData.append('dFecinicio', this.datePipe.transform(this.planDeTrabajoForm.get('fechaInicioVigencia').value, 'dd-MM-yyyy'));
    formData.append('dFecfin', this.datePipe.transform(this.planDeTrabajoForm.get('fechaFinVigencia').value, 'dd-MM-yyyy'));
    formData.append('vNumdocapr', this.planDeTrabajoForm.get('documentoAprobacion').value);

    this.spinnerService.show();
    this.planTrabajoService.actualizarPlanTrabajo(formData).subscribe(
      (data: PlanTrabajoResponse) => {
        console.log(data);
        this.spinnerService.show();
        setTimeout(() => {
          this.spinnerService.hide();
          Swal.fire(editConfig).then((result) => {
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

  obtenerPlanTrabajo() {
    this.planTrabajoService.buscarPlanTrabajoPorId(this.id).subscribe(
      (data: PlanTrabajoResponse) => {
        this.planTrabajo = data;
        this.spinnerService.hide();

        console.log('BUSQUEDA POR ID');
        console.log(data);
        this.planDeTrabajoForm.setValue({
          codigo: data.vCodigoplantrab,
          fechaAprobacion: data.dFecaprobacion ? new Date(data.dFecaprobacion.toString().replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3')) : '',
          fechaInicioVigencia: data.dFecinicio ? new Date(data.dFecinicio.toString().replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3')) : '',
          fechaFinVigencia: data.dFecfin ? new Date(data.dFecfin.toString().replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3')) : '',
          documentoAprobacion: data.vNumdocapr,
          adjuntoDocumentoAprobacion: data.vNomarchdocaprob + '.' + data.vExtarchdocaprob,
          adjuntoPlanTrabajo: data.vNomarchplan + '.' + data.vExtarchplan,
          comision: data.cOmisionfk,
        });
      }, error => {
        console.log(error);
        this.spinnerService.hide();
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
}
