import {Component, OnInit, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {saveConfig} from '../../../services/sweetAlertConfig';
import { DatePipe } from '@angular/common';
import { BoletinesService } from 'src/app/services/boletines.service';
import { BoletinResponse } from 'src/app/dto/response/Boletin.response';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-boletines-nuevo',
  templateUrl: './boletines-nuevo.component.html',
  styleUrls: ['./boletines-nuevo.component.scss']
})
export class BoletinesNuevoComponent implements OnInit {

  boletinForm: FormGroup;

  private archivoAdjunto: File;

  constructor(private fb: FormBuilder, private spinnerService: NgxSpinnerService, private router: Router,
              private datePipe: DatePipe,
              @Inject(BoletinesService) private boletinesService: BoletinesService) {
  }

  ngOnInit() {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      // INICIA EL FORMUALRIO AQUI
    }, 800);

    this.boletinForm = this.fb.group({
     // numeroBoletin: [{value:'',disabled:true}, Validators.required],
      comision: [''],
      fecha: ['', Validators.required],
      adjunto: ['', Validators.required],
    });
    this.verificarcookies();
  }

  // guardar() {
  //   this.spinnerService.show();
  //   setTimeout(() => {
  //     this.spinnerService.hide();
  //     Swal.fire(saveConfig).then((result) => {
  //       this.router.navigate(['/panel/boletines']);
  //     });

  //   }, 800);

  // }

  guardar() {
    const formData = new FormData();
    formData.append('comision', this.boletinForm.get('comision').value);
    formData.append('fecha', this.datePipe.transform(this.boletinForm.get('fecha').value, 'dd-MM-yyyy'));
    formData.append('archivoboletin', this.archivoAdjunto);


    this.spinnerService.show();
    this.boletinesService.registrarBoletin(formData).subscribe(
      (data: BoletinResponse) => {
        console.log(data);
        setTimeout(() => {
          this.spinnerService.hide();
          Swal.fire(saveConfig).then((result) => {
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
