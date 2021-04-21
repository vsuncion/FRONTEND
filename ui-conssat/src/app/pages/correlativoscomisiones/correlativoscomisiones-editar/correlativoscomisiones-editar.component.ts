import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { NgxSpinnerService } from 'ngx-spinner';
import { correlativocomisionresponse } from 'src/app/dto/response/correlativocomision.response';
import { CorrelativoComisionService } from 'src/app/services/correlativoComision.service';
import { editConfig } from 'src/app/services/sweetAlertConfig';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-correlativoscomisiones-editar',
  templateUrl: './correlativoscomisiones-editar.component.html',
  styleUrls: ['./correlativoscomisiones-editar.component.scss']
})
export class CorrelativoscomisionesEditarComponent implements OnInit {


  busquedaForm: FormGroup;
  private sub: any;
  id: number;

  constructor(
    private router: Router,
    private fb: FormBuilder, private spinnerService: NgxSpinnerService,
    @Inject(CorrelativoComisionService) private correlativoComisionService: CorrelativoComisionService,
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
        tipoComision: [''] ,
        valorinicial: [''] 
     }
    );

    this.verificarcookies();
    this.obtenerInfoCorrelativo();
  }


  obtenerInfoCorrelativo(){
    console.log(this.id);
    this.spinnerService.show();
    this.correlativoComisionService.buscarCorrelativoPorId(this.id).subscribe(
      (data: correlativocomisionresponse)=> {
        console.log('BUSQUEDA POR ID');
        console.log(data);
        this.busquedaForm.setValue(
          {
            region: data.region.vDesnombre, 
            tipoComision: data.tipoComisiones.vDesnombre,
            valorinicial: data.valorInicial
          }
        );
        setTimeout(() => {
          this.spinnerService.hide();
        }, 800);

      }, error => {
        console.log(error);
      }

    );
  }


  cancelar() {
    this.router.navigate(['/panel/correlativoscomision']);
  }

  guardar(){
    console.log('=============== GUARDAR ================');
    const formData = new FormData();
    formData.append('vcodigocorrelativocomision',this.id+'');
    formData.append('valorinicial',this.busquedaForm.get('valorinicial').value);

    formData.forEach((value, key) => {
      console.log("key %s: value %s", key, value);
      });

      this.spinnerService.show();
      this.correlativoComisionService.actualizarCorrelativo(formData).subscribe(
        (data: correlativocomisionresponse) => {
          console.log(data);
          setTimeout(() => {
            this.spinnerService.hide();
            Swal.fire(editConfig).then((result) => {
              this.router.navigate(['/panel/correlativoscomision']);
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
