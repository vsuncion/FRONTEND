import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {Router, ActivatedRoute} from '@angular/router';
import { PlanTrabajoService } from 'src/app/services/plan-trabajo.service';
import { PlanTrabajoResponse } from 'src/app/dto/response/PlanTrabajo.response';
import { backendUrl } from 'src/app/common';
import { Cookie } from 'ng2-cookies/ng2-cookies';


@Component({
  selector: 'app-planes-de-trabajo-ver',
  templateUrl: './planes-de-trabajo-ver.component.html',
  styleUrls: ['./planes-de-trabajo-ver.component.scss']
})
export class PlanesDeTrabajoVerComponent implements OnInit {
  private sub: any;
  id: number;

  private selectedfile: File;
  planDeTrabajoForm: FormGroup;

  constructor(private fb: FormBuilder, private spinnerService: NgxSpinnerService, private router: Router,
              private route: ActivatedRoute,
              @Inject(PlanTrabajoService) private planTrabajoService: PlanTrabajoService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      // INICIA EL FORMUALRIO AQUI
    }, 800);

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


    this.planDeTrabajoForm.disable();
    this.obtenerPlanTrabajo();
    this.verificarcookies();
  }

  obtenerPlanTrabajo() {
    this.planTrabajoService.buscarPlanTrabajoPorId(this.id).subscribe(
      (data: PlanTrabajoResponse) => {
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
      }
    );
  }

  cancelar() {
    this.router.navigate(['/panel/planes-de-trabajo']);
  }

  descargarDocumentoAprobacion() {
    window.open(`${backendUrl}api/plantrabajo/descargaraprobacion/${this.id}`);
  }

  descargarPlanTrabajo() {
    window.open(`${backendUrl}api/plantrabajo/descargarplan/${this.id}`);
    // window.open(`${backendUrl}api/plantrabajo/descargarplan/${this.id}`, '_blank');
  }
  verificarcookies() {
    if (!Cookie.get('inforegioncodigo') ) {
      this.router.navigate(['/login']);
    }
  }

}


