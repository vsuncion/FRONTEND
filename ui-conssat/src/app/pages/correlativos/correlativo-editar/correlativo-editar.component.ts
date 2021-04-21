import { Component, OnInit,Inject} from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router,ActivatedRoute } from '@angular/router';
import { CorrelativosService } from 'src/app/services/correlativos.service';
import { FijasService } from 'src/app/services/fijas.service';
import { RegionResponse } from 'src/app/dto/response/Boletin.response';
import { CorrelativoResponse } from 'src/app/dto/response/Correlativo.response';
import { deleteConfig, editConfig } from 'src/app/services/sweetAlertConfig';
import Swal from 'sweetalert2';
import { HttpResponse } from '@angular/common/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-correlativo-editar',
  templateUrl: './correlativo-editar.component.html',
  styleUrls: ['./correlativo-editar.component.scss']
})
export class CorrelativoEditarComponent implements OnInit {

  private sub: any;
  id: number;
  busquedaForm: FormGroup;

  constructor(private fb: FormBuilder, private spinnerService: NgxSpinnerService, private router: Router,
    private route: ActivatedRoute, @Inject(CorrelativosService) private correlativosService: CorrelativosService) { }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.id = params.id;
    });

    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      // INICIA EL FORMUALRIO AQUI
    }, 800);

    this.busquedaForm = this.fb.group({
      region: [''],
     // modulo: [''],
      consejo: [''],
      tipoconsejo: [''],
      valorinicial: ['']
    });
    this.verificarcookies();
    this.obtenerInfoCorrelativo();
  }

  obtenerInfoCorrelativo(){
   this.spinnerService.show();
   this.correlativosService.buscarCorrelativoPorId(this.id).subscribe(
    (data: CorrelativoResponse) => {
      console.log('BUSQUEDA POR ID');
      console.log(data);
      this.busquedaForm.setValue({
        region: data.vRegion,
       // modulo: data.vModulo,
        consejo: data.vConsejo,
        tipoconsejo: data.vTipo,
        valorinicial: data.nValorInicial
      });
      setTimeout(() => {
          this.spinnerService.hide();
        }, 800);
    }, error => {
      console.log(error);
    }
   );
  }

  guardar(){
    const formData = new FormData();
    formData.append('nValorInicial', this.busquedaForm.get('valorinicial').value);
    formData.append('cOrrelativoidpk', this.id + '');

    this.spinnerService.show();
    this.correlativosService.actualizarCorrelativo(formData).subscribe(
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
