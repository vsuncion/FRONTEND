import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { CorrelativosesioneService } from 'src/app/services/correlativosesione.service';
import { Correlativosesionresponse } from 'src/app/dto/response/correlativosesion.response';
import { editConfig } from 'src/app/services/sweetAlertConfig';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-correlativosesion-editar',
  templateUrl: './correlativosesion-editar.component.html',
  styleUrls: ['./correlativosesion-editar.component.scss']
})
export class CorrelativosesionEditarComponent implements OnInit {

  busquedaForm: FormGroup;
  regiones = [];
  tiposSesiones = [];
  private sub: any;
  id: number;
  
  constructor(
    private router: Router,
    private fb: FormBuilder, private spinnerService: NgxSpinnerService,
    @Inject(CorrelativosesioneService) private correlativosesioneService: CorrelativosesioneService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.id = params.id;
    });

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
 this.obtenerInfoCorrelativo();

  }


  obtenerInfoCorrelativo(){
    this.spinnerService.show();
   this.correlativosesioneService.buscarCorrelativoPorId(this.id).subscribe(
    (data: Correlativosesionresponse) => {
      console.log('BUSQUEDA POR ID');
      console.log(data);
      this.busquedaForm.setValue({
        region: data.region.vDesnombre, 
        tipoSesion: data.tipoSesion.vDesnombre,
        codigocomision: data.comision.vCodcomision,
        valorinicial: data.valorInicial
      });
      setTimeout(() => {
          this.spinnerService.hide();
        }, 800);
    }, error => {
      console.log(error);
    }
   );
  }


  cancelar() {
    this.router.navigate(['/panel/correlativosesion']);
  }

  guardar(){
    console.log("aquiiiii");
    const formData = new FormData();
    formData.append('valorinicial', this.busquedaForm.get('valorinicial').value);
    formData.append('vsesioncorrelativo', this.id + '');
    
   formData.forEach((value, key) => {
    console.log("key %s: value %s", key, value);
    });

    this.spinnerService.show();
    this.correlativosesioneService.actualizarCorrelativo(formData).subscribe(
      (data: Correlativosesionresponse) => {
        console.log(data);
        setTimeout(() => {
          this.spinnerService.hide();
          Swal.fire(editConfig).then((result) => {
            this.router.navigate(['/panel/correlativosesion']);
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

  verificarcookies() {
    if (!Cookie.get('inforegioncodigo')) {
      this.router.navigate(['/login']);
    }
  }

}
