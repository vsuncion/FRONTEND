import {Component, OnInit, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {deleteConfig, saveConfig} from '../../../services/sweetAlertConfig';
import { DatePipe } from '@angular/common';
import { ComisionesService } from 'src/app/services/comisiones.service';
import { ComisionesResponse } from 'src/app/dto/response/Comisiones.response';
import { ConsejeroResponse } from 'src/app/dto/response/Consejero.response';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-comisiones-nuevo',
  templateUrl: './comisiones-nuevo.component.html',
  styleUrls: ['./comisiones-nuevo.component.scss']
})
export class ComisionesNuevoComponent implements OnInit {

  consejoForm: FormGroup;

  private archivoAdjunto: File;

  encargados = [];

  constructor(private fb: FormBuilder, private spinnerService: NgxSpinnerService, private router: Router, private datePipe: DatePipe,
              @Inject(ComisionesService) private comisionesService: ComisionesService) { }

  ngOnInit() {
    this.consejoForm = this.fb.group({
      numeroComision: [{value: '', disabled: true}, Validators.required],
      encargado: ['', Validators.required],
      numeroDocaprobacion: [''],
      fechaDocumento: ['', Validators.required],
      adjunto: ['', Validators.required],
      tipo: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      descripcion: ['']
    });

    this.listarEncargado();
    this.verificarcookies();
  }

  guardar() {
    const formData = new FormData();
    formData.append('tipocomision', this.consejoForm.get('tipo').value);
    formData.append('numerodocaprobacion', this.consejoForm.get('numeroDocaprobacion').value);
    formData.append('fechaaprobacion', this.datePipe.transform(this.consejoForm.get('fechaDocumento').value, 'dd-MM-yyyy'));
    formData.append('archivocomision', this.archivoAdjunto);
    formData.append('fechainicio', this.datePipe.transform(this.consejoForm.get('fechaInicio').value, 'dd-MM-yyyy'));
    formData.append('fechafin', this.datePipe.transform(this.consejoForm.get('fechaFin').value, 'dd-MM-yyyy'));
    formData.append('consejeroasignado', this.consejoForm.get('encargado').value);
    formData.append('descripcion', this.consejoForm.get('descripcion').value);

    this.spinnerService.show();
    this.comisionesService.registrarComisiones(formData).subscribe(
      (data: ComisionesResponse) => {
        console.log(data);
        setTimeout(() => {
          this.spinnerService.hide();
          Swal.fire(saveConfig).then((result) => {
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

  selectedFileDocAprobacion($event) {
    this.archivoAdjunto = $event.target.files[0];
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
  verificarcookies() {
    if (!Cookie.get('inforegioncodigo') ) {
      this.router.navigate(['/login']);
    }
  }

}
