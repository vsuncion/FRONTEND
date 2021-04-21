import { Component, OnInit,Inject} from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MaterialTablePaginator } from 'src/app/core/material.table.paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { CorrelativosesioneService} from 'src/app/services/correlativosesione.service';
import { Correlativosesionresponse, RegionResponse} from 'src/app/dto/response/correlativosesion.response';
import { deleteConfig } from 'src/app/services/sweetAlertConfig';
import Swal from 'sweetalert2';
import { HttpResponse } from '@angular/common/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { FijasService } from 'src/app/services/fijas.service';
import { TipoSesionesResponse } from 'src/app/dto/response/SesionTrabajo.response';
import { BuscarCorrelativoSesionRequest } from 'src/app/dto/request/buscarCorrelativoSsesion.request';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-correlativosesion',
  templateUrl: './correlativosesion.component.html',
  styleUrls: ['./correlativosesion.component.scss']
})
export class CorrelativosesionComponent implements OnInit {
  listarCorrelativo = [];
  regiones = [];
  tiposSesiones = [];
  busquedaForm: FormGroup;
  dataSource: MatTableDataSource<any> = null;

  displayedColumns: string[] = ['nro', 'region', 'comision','tipocomision', 'tiposesion','fecharegistro', 'valor', 'editar'];
  

  constructor(private fb: FormBuilder, private spinnerService: NgxSpinnerService, private router: Router,
    @Inject(CorrelativosesioneService) private correlativosesioneService: CorrelativosesioneService,
    @Inject(FijasService) private fijasService: FijasService,
    private validationService: ValidationService ){ }

  ngOnInit() {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      // INICIA EL FORMUALRIO AQUI
    }, 800);
    this.busquedaForm = this.fb.group(
  {
    region: [''],
    tipoSesion: [''],
    codigocomision: ['']
  }
 );

 this.verificarcookies();
 this.listarcorrelativos();
 this.listarRegionesPais();
 this.listarTipoSesion();
}



listarcorrelativos(){
  this.correlativosesioneService.listarCorrelativos().subscribe(
    (data: Correlativosesionresponse[]) => {
      console.log(data);
      this.listarCorrelativo = data;
      this.cargarDatosTabla();
    },
    error => {
      console.log(error);
    }
  );
}

public cargarDatosTabla(): void {
  if(this.listarCorrelativo.length>0){
    this.dataSource = new MatTableDataSource(this.listarCorrelativo);
  }else{
    this.listarCorrelativo=[];
    this.dataSource = new MatTableDataSource(this.listarCorrelativo);
  }
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



verificarcookies() {
  if (!Cookie.get('inforegioncodigo')) {
    this.router.navigate(['/login']);
  }
}


 buscarComisionSesiones(){
  console.log('hola');
  let formData = new FormData();
  formData.append('region', this.busquedaForm.get('region').value);
  formData.append('tipoSesion', this.busquedaForm.get('tipoSesion').value);
  formData.append('codigocomision', this.busquedaForm.get('codigocomision').value);
  this.correlativosesioneService.buscarCorrelativoSesion(formData).subscribe(
    (data: Correlativosesionresponse[]) => {
      console.log(data);
      this.spinnerService.hide(); 
      this.listarCorrelativo = data;
      this.cargarDatosTabla();
    }, error => {
      console.log(error);
      this.spinnerService.hide();
    }
  );

}


limpiarRegistro() {
  this.validationService.setAsUntoched(this.busquedaForm);
}


nuevoRegistro() {
  this.router.navigate(['/panel/correlativosesion/nuevo']);
}

editarRegistro(id: any) {
  this.router.navigate(['/panel/correlativosesion/editar/' + id]);
}

 


}
