import { Component, OnInit ,Inject} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { correlativocomisionresponse, RegionResponse } from 'src/app/dto/response/correlativocomision.response';
import { CorrelativoComisionService} from 'src/app/services/correlativoComision.service';
import { FijasService } from 'src/app/services/fijas.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-correlativocomision',
  templateUrl: './correlativocomision.component.html',
  styleUrls: ['./correlativocomision.component.scss']
})
export class CorrelativocomisionComponent implements OnInit {

  listarCorrelativo = [];
  regiones = [];
  busquedaForm: FormGroup;
  dataSource: MatTableDataSource<any> = null;
  displayedColumns: string[] = ['nro', 'region', 'tipocomision','fecharegistro', 'valor', 'editar'];


  constructor(private fb: FormBuilder, private spinnerService: NgxSpinnerService, private router: Router,
    @Inject(CorrelativoComisionService) private correlativoComisionService: CorrelativoComisionService,
    @Inject(FijasService) private fijasService: FijasService,private validationService: ValidationService) { }

  ngOnInit() {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      // INICIA EL FORMUALRIO AQUI
    }, 800);
    this.busquedaForm = this.fb.group(
     {
      region: [''] 
     }
    );


    this.verificarcookies();
    this.listarcorrelativos();
    this.listarRegionesPais();
  }



  listarcorrelativos(){
    this.correlativoComisionService.listarCorrelativos().subscribe(
      (data: correlativocomisionresponse[]) => {
        console.log(data);
        this.listarCorrelativo = data;
        console.log(data);
        this.cargarDatosTabla();
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


  public cargarDatosTabla(): void {
    if(this.listarCorrelativo.length>0){
      this.dataSource = new MatTableDataSource(this.listarCorrelativo);
    }else{
      this.listarCorrelativo=[];
      this.dataSource = new MatTableDataSource(this.listarCorrelativo);
    }
  }


  nuevoRegistro(){
    this.router.navigate(['/panel/correlativoscomision/nuevo']);
  }

  editarRegistro(id: any) {
   this.router.navigate(['/panel/correlativoscomision/editar/' + id]);
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


  limpiarRegistro() {
    this.validationService.setAsUntoched(this.busquedaForm);
  }



}
