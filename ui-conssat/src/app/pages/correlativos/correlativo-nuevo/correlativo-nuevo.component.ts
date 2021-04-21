import { SeleccionResponse } from 'src/app/dto/response/seleccion.response';
import { Component, OnInit,Inject} from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { CorrelativosService } from 'src/app/services/correlativos.service';
import { FijasService } from 'src/app/services/fijas.service';
import { RegionResponse } from 'src/app/dto/response/Boletin.response';
import { CorrelativoResponse } from 'src/app/dto/response/Correlativo.response';
import { deleteConfig,editConfig } from 'src/app/services/sweetAlertConfig';
import Swal from 'sweetalert2';
import { HttpResponse } from '@angular/common/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-correlativo-nuevo',
  templateUrl: './correlativo-nuevo.component.html',
  styleUrls: ['./correlativo-nuevo.component.scss']
})
export class CorrelativoNuevoComponent implements OnInit {

  regiones = [];
  consejos = [];
  //modulos = [];
  tpmodulos = [];
  busquedaForm: FormGroup;

  constructor(private fb: FormBuilder, private spinnerService: NgxSpinnerService, private router: Router,
    @Inject(CorrelativosService) private correlativosService: CorrelativosService,
    @Inject(FijasService) private fijasService: FijasService) { }

  ngOnInit() {

    this.busquedaForm = this.fb.group({
      region: [''],
      consejo: [''],
     // modulo: [''],
      tpmodulo: [''],
      valorinicial: ['']
    });

    this.verificarcookies();
    this.listarRegionesPais();
    this.listarTipoModulos();
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


  listarConsejos(id: number){
    this.spinnerService.show();
    this.fijasService.listarConsejo(id).subscribe(
      (data: SeleccionResponse[]) => {
        console.log(data);
        this.consejos = data;
        setTimeout(() => {
          this.spinnerService.hide();
          //this.listarModulos(0);

        }, 800);
      },
      error => {
        console.log(error);
      }
    );
  }

/*
listarModulos(id: number){
  this.spinnerService.show();
  this.fijasService.listarModulo(id).subscribe(
    (data: SeleccionResponse[]) => {
      console.log(data);
      this.modulos = data;
      this.listarTipoModulos(0);
      setTimeout(() => {
        this.spinnerService.hide();
      }, 800);
    },
    error => {
      console.log(error);
    }
  );
 console.log("---------"+id)
}*/


listarTipoModulos(){
  console.log("***************** listarTipoModulos ")
  this.spinnerService.show();
  this.fijasService.listarTipoModulo().subscribe(
    (data: SeleccionResponse[]) => {
      console.log(data);
      this.tpmodulos = data;
      setTimeout(() => {
        this.spinnerService.hide();
      }, 800);
    },
    error => {
      console.log(error);
    }
  );

}


guardar(){

  const formData = new FormData();
    formData.append('vRegion',  this.busquedaForm.get('region').value);
    //formData.append('vModulo',  this.busquedaForm.get('modulo').value);
    formData.append('vConsejo',  this.busquedaForm.get('consejo').value);
    formData.append('vTipo',  this.busquedaForm.get('tpmodulo').value);
    formData.append('nValorInicial', this.busquedaForm.get('valorinicial').value);
    console.log(formData);

    this.spinnerService.show();
    this.correlativosService.registrarCorrelativo(formData).subscribe(
      (data: CorrelativoResponse) => {
        console.log(data);
        setTimeout(() => {
          this.spinnerService.hide();
          Swal.fire(editConfig).then((result) => {
            this.router.navigate(['/panel/correlativos']);
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

 /*  for (const formElement of formData) {
    console.log(formElement);
  }*/

}

verificarcookies() {
  if (!Cookie.get('inforegioncodigo')) {
    this.router.navigate(['/login']);
  }
}


}
