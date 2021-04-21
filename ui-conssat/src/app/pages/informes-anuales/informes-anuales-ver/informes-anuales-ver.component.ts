import {Component, OnInit, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {Router, ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import Swal from 'sweetalert2';
import {editConfig} from '../../../services/sweetAlertConfig';
import { InformesGestionService } from 'src/app/services/informes- gestion.service';
import { InformeAnualResponse } from 'src/app/dto/response/InformeAnual.response';
import { backendUrl } from 'src/app/common';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-informes-anuales-ver',
  templateUrl: './informes-anuales-ver.component.html',
  styleUrls: ['./informes-anuales-ver.component.scss']
})
export class InformesAnualesVerComponent implements OnInit {
  private sub: any;
  id: number;

  informeForm: FormGroup;

  constructor(private fb: FormBuilder, private spinnerService: NgxSpinnerService, private router: Router, private location: Location,
              private route: ActivatedRoute,
              @Inject(InformesGestionService) private informesGestionService: InformesGestionService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    this.spinnerService.show();
    this.informeForm = this.fb.group({
      numeroInforme: ['', Validators.required],
      numeroSesion: ['', Validators.required],
      fecha: ['', Validators.required],
      adjunto: ['', Validators.required],
    });
    this.informeForm.disable();
    this.obtenerSesionTrabajo();
    this.verificarcookies();
  }

  obtenerSesionTrabajo() {
    this.informesGestionService.buscarInformeAnualPorId(this.id).subscribe(
      (data: InformeAnualResponse) => {
        console.log('BUSQUEDA POR ID');
        console.log(data);
        this.informeForm.setValue({
          numeroInforme: data.vCodinforme,
          numeroSesion: data.vSesion,
          fecha: data.dFecdesde ? new Date(data.dFecdesde.toString().replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3')) : '',
          adjunto: data.vNombreArchivo + '.' + data.vExtension,
        });
        this.spinnerService.hide();
      }, error => {
        console.log(error);
        this.spinnerService.hide();
      }
    );
  }

  cancelar() {
    this.location.back();
  }

  descargarBoletin() {
    window.open(`${backendUrl}api/informes/descargar/${this.id}`);
  }
  verificarcookies() {
    if (!Cookie.get('inforegioncodigo') ) {
      this.router.navigate(['/login']);
    }
  }
}
