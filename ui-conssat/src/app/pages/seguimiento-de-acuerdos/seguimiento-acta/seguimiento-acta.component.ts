import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AccionRow} from '../models/accionRow';
import {Location} from '@angular/common';
import {NgxSpinnerService} from 'ngx-spinner';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-seguimiento-acta',
  templateUrl: './seguimiento-acta.component.html',
  styleUrls: ['./seguimiento-acta.component.scss']
})
export class SeguimientoActaComponent implements OnInit {

  sesionDeTrabajo: any;

  accionList: AccionRow[] = [];

  constructor(private router: Router,
              private spinner: NgxSpinnerService,
              private location: Location) {
  }

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      // INICIA EL FORMUALRIO AQUI
      this.sesionDeTrabajo = {
        numeroSesion: '0-20-90898990',
        numeroActa: 'ACTA-2020-90898990',
        tipoSesion: '02',
        fechaActa: new Date(),
        acuerdo: 'ACUERDO 1 CON DESCRIPCION GENERICA',
        responsable: '',
        entidad: '',
        fechaAtencion: null,
      };
      console.log('in parent ', this.sesionDeTrabajo);
      this.spinner.hide();
    }, 800);
    this.verificarcookies();
  }

  cancelar() {
    this.location.back();
  }
  verificarcookies() {
    if (!Cookie.get('inforegioncodigo') ) {
      this.router.navigate(['/login']);
    }
  }

}
