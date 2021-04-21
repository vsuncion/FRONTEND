import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { RegionResponse } from 'src/app/dto/response/Boletin.response';
import { TipoSesionesResponse } from 'src/app/dto/response/SesionTrabajo.response';
import { FijasService } from 'src/app/services/fijas.service';
import { Router } from '@angular/router';
import { CorrelativosesioneService } from 'src/app/services/correlativosesione.service';
import { Correlativosesionresponse } from 'src/app/dto/response/correlativosesion.response';
import Swal from 'sweetalert2';
import { deleteConfig, editConfig, saveConfig } from '../../../services/sweetAlertConfig';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-correlativosesion-nuevo',
  templateUrl: './correlativosesion-nuevo.component.html',
  styleUrls: ['./correlativosesion-nuevo.component.scss']
})
export class CorrelativosesionNuevoComponent implements OnInit {

  busquedaForm: FormGroup;
  regiones = [];
  tiposSesiones = [];

  constructor(
    private router: Router,
    private fb: FormBuilder, private spinnerService: NgxSpinnerService,
    @Inject(CorrelativosesioneService) private correlativosesioneService: CorrelativosesioneService,
    @Inject(FijasService) private fijasService: FijasService) { }

  ngOnInit() {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      // INICIA EL FORMUALRIO AQUI
    }, 800);
    this.busquedaForm = this.fb.group(
  {
    region: [''],
    tipoSesion: [''] ,
    valorinicial: [''] ,
    codigocomision: ['']
  }
 );

    this.verificarcookies();
    this.listarRegionesPais();
    this.listarTipoSesion();
  }


  listarRegionesPais() {
    // LLAMAR A SERVICIO
    this.fijasService.listarRegiones().subscribe(
      (data: RegionResponse[]) => {
        console.log(data);
        this.regiones = data;
      },
      error => {
        console.log(error);
      }
    );
    // dataSource
  }

  listarTipoSesion() {
    this.fijasService.listarTipoSesion().subscribe(
      (data: TipoSesionesResponse[]) => {
        console.log(data);
        this.tiposSesiones = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  cancelar() {
    this.router.navigate(['/panel/correlativosesion']);
  }

  guardar(){
    console.log('GRABARRR');
    const formData = new FormData();
    formData.append('vregion',  this.busquedaForm.get('region').value);
    formData.append('vcomision',  this.busquedaForm.get('codigocomision').value);
    formData.append('vtiposesion',  this.busquedaForm.get('tipoSesion').value);
    formData.append('valorinicial',  this.busquedaForm.get('valorinicial').value);
    
    /*
   formData.forEach((value, key) => {
    console.log("key %s: value %s", key, value);
    })
  */

    this.spinnerService.show();
    this.correlativosesioneService.registrarCorrelativo(formData).subscribe(
      (data: Correlativosesionresponse) => {
        console.log(data);
        setTimeout(() => {
          this.spinnerService.hide();
          Swal.fire(saveConfig).then((result) => {
            this.router.navigate(['/panel/correlativosesion']);
          });
        }, 800);
      }, error => {
        console.log(error);
        this.spinnerService.hide();
        Swal.fire({
          icon: 'error',
          title: error.error.error,
          text: error.error.mensaje
        });
      }
    );



  }

  verificarcookies() {
    if (!Cookie.get('inforegioncodigo') ) {
      this.router.navigate(['/login']);
    }
  }



}
