import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {Router, ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2';
import {deleteConfig, editConfig} from '../../../services/sweetAlertConfig';
import { DatePipe } from '@angular/common';
import { ComisionesService } from 'src/app/services/comisiones.service';
import { ComisionesResponse } from 'src/app/dto/response/Comisiones.response';
import { ConsejeroResponse } from 'src/app/dto/response/Consejero.response';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-comisiones-editar',
  templateUrl: './comisiones-editar.component.html',
  styleUrls: ['./comisiones-editar.component.scss']
})
export class ComisionesEditarComponent implements OnInit {
  private sub: any;
  id: number;
  comision: any;
  consejoForm: FormGroup;
  encargados = [];
  private archivoAdjunto: File;
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute,
              private datePipe: DatePipe, private spinnerService: NgxSpinnerService,
              @Inject(ComisionesService) private comisionesService: ComisionesService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params.id;
    });

    this.consejoForm = this.fb.group({
      numeroComision: [{value: '', disabled: true}, Validators.required],
      encargado: ['', Validators.required],
      numeroDocaprobacion: ['', Validators.required],
      fechaDocumento: ['', Validators.required],
      adjunto: ['', Validators.required],
      tipo: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      descripcion: ['']
    });

    this.obtenerComision();
    this.listarEncargado();
    this.verificarcookies();
  }

  obtenerComision() {
    this.comisionesService.buscarComisionPorId(this.id).subscribe(
      (data: ComisionesResponse) => {
        console.log('BUSQUEDA POR ID');
        console.log(data);
        this.comision = data;
        this.consejoForm.setValue({
          numeroComision: data.vCodcomision,
          encargado: data.consejero.cOnsejeroidpk,
          numeroDocaprobacion: data.vNumdocapr,
          fechaDocumento: data.dFecdocapr ? new Date(data.dFecdocapr.toString().replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3')) : '',
          adjunto: '',
          tipo: data.tipocomision.tIpocomsidpk + '',
          fechaInicio: data.dFecinicio ? new Date(data.dFecinicio.toString().replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3')) : '',
          fechaFin: data.dFecfin ? new Date(data.dFecfin.toString().replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3')) : '',
          descripcion: data.vDescripcion
        });
      }, error => {
        console.log(error);
      }
    );
  }

  guardar() {
    const formData = new FormData();
    formData.append('codigocomision', this.id + '');
    formData.append('tipocomision', this.consejoForm.get('tipo').value);
    formData.append('numerodocaprobacion', this.consejoForm.get('numeroDocaprobacion').value);
    formData.append('fechaaprobacion', this.datePipe.transform(this.consejoForm.get('fechaDocumento').value, 'dd-MM-yyyy'));
    formData.append('archivocomision', this.archivoAdjunto);
    formData.append('fechainicio', this.datePipe.transform(this.consejoForm.get('fechaInicio').value, 'dd-MM-yyyy'));
    formData.append('fechafin', this.datePipe.transform(this.consejoForm.get('fechaFin').value, 'dd-MM-yyyy'));
    formData.append('consejeroasignado', this.consejoForm.get('encargado').value);
    formData.append('descripcion', this.consejoForm.get('descripcion').value);

    this.spinnerService.show();
    this.comisionesService.actualizarComision(formData).subscribe(
      (data: ComisionesResponse) => {
        console.log(data);
        setTimeout(() => {
          this.spinnerService.hide();
          Swal.fire(editConfig).then((result) => {
            this.router.navigate(['/panel/comisiones']);
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
    this.router.navigate(['/panel/comisiones']);

  }

  listarEncargado() {
    // LLAMAR A SERVICIO

    console.log('este esta llamando');
    this.comisionesService.listarEncargados().subscribe(
      (data: ConsejeroResponse[]) => {
        console.log(data);
        this.encargados = data;

      },
      error => {
        console.log(error);
      }
    );

    // dataSource
  }

  selectedFileDocAprobacion($event) {
    this.archivoAdjunto = $event.target.files[0];
  }
  verificarcookies() {
    if (!Cookie.get('inforegioncodigo') ) {
      this.router.navigate(['/login']);
    }
  }
}
