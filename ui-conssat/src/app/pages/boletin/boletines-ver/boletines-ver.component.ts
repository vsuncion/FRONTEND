import {Component, OnInit, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {Router, ActivatedRoute} from '@angular/router';
import { BoletinesService } from 'src/app/services/boletines.service';
import { BoletinEntidadEliminarResponse } from 'src/app/dto/response/BoletinEntidadEliminar.response';
import { backendUrl } from 'src/app/common';
import Swal from 'sweetalert2';
import { decargaConfig, errorConfig } from 'src/app/services/sweetAlertConfig';
import { PlanTrabajoService } from 'src/app/services/plan-trabajo.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-boletines-ver',
  templateUrl: './boletines-ver.component.html',
  styleUrls: ['./boletines-ver.component.scss']
})
export class BoletinesVerComponent implements OnInit {
  private sub: any;
  id: number;

  boletinForm: FormGroup;
  private archivoAdjunto: File;

  constructor(private fb: FormBuilder, private spinnerService: NgxSpinnerService, private router: Router,
              private route: ActivatedRoute,
              @Inject(BoletinesService) private boletinesService: BoletinesService,
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

      this.boletinForm.disable();


    }, 800);

    this.boletinForm = this.fb.group({
      numeroBoletin: ['', Validators.required],
      fecha: ['', Validators.required],
      adjunto: ['', Validators.required],
    });

    this.obtenerBoletin();
    this.verificarcookies();
  }

  obtenerBoletin() {
    this.boletinesService.buscarBoletinPorId(this.id).subscribe(
      (data: BoletinEntidadEliminarResponse) => {
        console.log('BUSQUEDA POR ID');
        console.log(data);
        this.boletinForm.setValue({
          numeroBoletin: data.entidad.vNumbol,
          fecha: data.entidad.dFecboletin ? new Date(data.entidad.dFecboletin.toString().replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3')) : '',
          adjunto: data.entidad.vNombrearchivo + '.' + data.entidad.vArchivoextension,
        });
        this.spinnerService.hide();
      }, error => {
        console.log(error);
        this.spinnerService.hide();
      }
    );
  }

  cancelar() {
    this.router.navigate(['/panel/boletines']);

  }

  decargarArchivo() {

    window.open(`${backendUrl}api/boletines/descargar/${this.id}`);

    // this.spinnerService.show();

    // this.boletinesService.decargarBoletinId(this.id).subscribe(
    //   (data: any) => {
    //     this.spinnerService.hide();
    //     Swal.fire(decargaConfig);
    //     let blob = this.planTrabajoService.crearBlobFile(data);
    //     const link = document.createElement('a');
    //     link.target = '_blank';
    //     link.href = window.URL.createObjectURL(blob);
    //     link.click();
    //   },
    //   error => {
    //     console.error(error);
    //     Swal.fire(errorConfig);
    //   });
  }
  verificarcookies() {
    if (!Cookie.get('inforegioncodigo') ) {
      this.router.navigate(['/login']);
    }
  }
}
