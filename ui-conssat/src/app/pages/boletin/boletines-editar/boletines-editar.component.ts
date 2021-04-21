import {Component, OnInit, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {NgxSpinnerService} from 'ngx-spinner';
import {Router, ActivatedRoute} from '@angular/router';
import {editConfig} from '../../../services/sweetAlertConfig';
import { BoletinesService } from 'src/app/services/boletines.service';
import { BoletinEntidadEliminarResponse } from 'src/app/dto/response/BoletinEntidadEliminar.response';
import { DatePipe } from '@angular/common';
import { BoletinResponse } from 'src/app/dto/response/Boletin.response';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-boletines-editar',
  templateUrl: './boletines-editar.component.html',
  styleUrls: ['./boletines-editar.component.scss']
})
export class BoletinesEditarComponent implements OnInit {
  private sub: any;
  id: number;

  boletinForm: FormGroup;
  private archivoAdjunto: File;

  constructor(private fb: FormBuilder, private spinnerService: NgxSpinnerService, private router: Router,
              private route: ActivatedRoute,
              private datePipe: DatePipe,
              @Inject(BoletinesService) private boletinesService: BoletinesService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params.id;
    });

    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      // INICIA EL FORMUALRIO AQUI

    }, 800);

    this.boletinForm = this.fb.group({
      numeroBoletin: [{value: '', disabled: true}, Validators.required],
      fecha: ['', Validators.required],
      adjunto: ['', Validators.required],
      comision: [''],
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
          comision: data.entidad.vComision,
        });
        this.spinnerService.hide();
      }, error => {
        console.log(error);
        this.spinnerService.hide();
      }
    );
  }

  // guardar() {

  //   this.spinnerService.show();
  //   setTimeout(() => {
  //     this.spinnerService.hide();
  //     Swal.fire(editConfig).then((result) => {
  //       this.router.navigate(['/panel/boletines']);
  //     });

  //   }, 800);


  // }

  guardar() {
    const formData = new FormData();
    formData.append('codigoboletin', this.id + '');
    formData.append('fecha', this.datePipe.transform(this.boletinForm.get('fecha').value, 'dd-MM-yyyy'));
    formData.append('archivoboletin', this.archivoAdjunto);
    formData.append('comision', this.boletinForm.get('comision').value);


    this.spinnerService.show();
    this.boletinesService.actualizarBoletin(formData).subscribe(
      (data: BoletinResponse) => {
        console.log(data);
        setTimeout(() => {
          this.spinnerService.hide();
          Swal.fire(editConfig).then((result) => {
            this.router.navigate(['/panel/boletines']);
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
    this.router.navigate(['/panel/boletines']);

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
}
