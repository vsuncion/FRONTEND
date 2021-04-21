import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { NgxSpinnerService } from 'ngx-spinner';
import { RegionResponse } from 'src/app/dto/response/Boletin.response';
import { correlativocomisionresponse } from 'src/app/dto/response/correlativocomision.response';
import { SeleccionResponse } from 'src/app/dto/response/seleccion.response';
import { CorrelativoComisionService } from 'src/app/services/correlativoComision.service';
import { FijasService } from 'src/app/services/fijas.service';
import { saveConfig } from 'src/app/services/sweetAlertConfig';
import { ValidationService } from 'src/app/services/validation.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-correlativoscomisiones-nuevo',
  templateUrl: './correlativoscomisiones-nuevo.component.html',
  styleUrls: ['./correlativoscomisiones-nuevo.component.scss']
})
export class CorrelativoscomisionesNuevoComponent implements OnInit {


  busquedaForm: FormGroup;
  regiones = [];
  tiposComision=[];

  constructor(
    private fb: FormBuilder, private spinnerService: NgxSpinnerService, private router: Router,
    @Inject(CorrelativoComisionService) private correlativoComisionService: CorrelativoComisionService,
    @Inject(FijasService) private fijasService: FijasService,private validationService: ValidationService
  ) { }

  ngOnInit() {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      // INICIA EL FORMUALRIO AQUI
    }, 800);
    this.busquedaForm = this.fb.group(
    {
    region: [''],
    tiposComision: [''],
    valorinicial: [''] 
    }
   );

   
   this.verificarcookies();
   this.listarRegionesPais();
   this.listarTipoComision();
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

  listarTipoComision() {
    // LLAMAR A SERVICIO
    this.fijasService.listarTipoComision().subscribe(
      (data: SeleccionResponse[]) => {
        console.log(data);
        this.tiposComision = data;
      },
      error => {
        console.log(error);
      }
    );
    // dataSource
  }



  cancelar() {
    this.router.navigate(['/panel/correlativoscomision']);
  }

  guardar(){
    console.log("==================GRABAR=======");
    const formData = new FormData();
    formData.append('region',this.busquedaForm.get('region').value);
    formData.append('tipoComisiones',this.busquedaForm.get('tiposComision').value);
    formData.append('valorInicial',this.busquedaForm.get('valorinicial').value);
     
   /*
    formData.forEach((value, key) => {
    console.log("key %s: value %s", key, value);
    })
  */
    this.spinnerService.show();
    this.correlativoComisionService.registrarCorrelativo(formData).subscribe(
    (data: correlativocomisionresponse) => {
      console.log(data);
        setTimeout(() => {
          this.spinnerService.hide();
          Swal.fire(saveConfig).then((result) => {
            this.router.navigate(['/panel/correlativoscomision']);
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
