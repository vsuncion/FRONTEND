import { Component, OnInit,Inject} from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MaterialTablePaginator } from 'src/app/core/material.table.paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { CorrelativosService } from 'src/app/services/correlativos.service';
import { CorrelativoResponse } from 'src/app/dto/response/Correlativo.response';
import { deleteConfig } from 'src/app/services/sweetAlertConfig';
import Swal from 'sweetalert2';
import { HttpResponse } from '@angular/common/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';


export interface PeriodicElement {
  nro: number;
  region: string;
  consejo: string;
  modulo: string;
  valor: string;
  editar: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {nro: 1, region: 'Hydrogen', consejo: 'CONSEJO 1', modulo: 'H', valor: 'H', editar: 'H'},
  {nro: 2, region: 'Helium', consejo: 'CONSEJO 1', modulo: 'He', valor: 'H', editar: 'H'},
  {nro: 3, region: 'Lithium', consejo: 'CONSEJO 1', modulo: 'Li', valor: 'H', editar: 'H'},
  {nro: 4, region: 'Beryllium', consejo: 'CONSEJO 1', modulo: 'Be', valor: 'H', editar: 'H'},
  {nro: 5, region: 'Boron', consejo: 'CONSEJO 1', modulo: 'B', valor: 'H', editar: 'H'},
  {nro: 6, region: 'Carbon', consejo: 'CONSEJO 1', modulo: 'C', valor: 'H', editar: 'H'},
  {nro: 7, region: 'Nitrogen', consejo: 'CONSEJO 1', modulo: 'N', valor: 'H', editar: 'H'},
  {nro: 8, region: 'Oxygen', consejo: 'CONSEJO 1', modulo: 'O', valor: 'H', editar: 'H'},
  {nro: 9, region: 'Fluorine', consejo: 'CONSEJO 1', modulo: 'F', valor: 'H', editar: 'H'},
  {nro: 10, region: 'Neon', consejo: 'CONSEJO 1', modulo: 'Ne', valor: 'H', editar: 'H'},
];


@Component({
  selector: 'app-correlativo',
  templateUrl: './correlativo.component.html',
  styleUrls: ['./correlativo.component.scss']
})
export class CorrelativoComponent implements OnInit {

  listarCorrelativo = [];
  busquedaForm: FormGroup;

//displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  displayedColumns: string[] = ['nro', 'region', 'consejo', 'modulo', 'tipo','valor', 'editar'];
  //dataSource = ELEMENT_DATA;


  dataSource: MatTableDataSource<any> = null;

  constructor(private fb: FormBuilder, private spinnerService: NgxSpinnerService, private router: Router,
    @Inject(CorrelativosService) private correlativosService: CorrelativosService) { }

  ngOnInit() {

    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      // INICIA EL FORMUALRIO AQUI
    }, 800);
this.busquedaForm = this.fb.group(
  {

  }
);
    this.verificarcookies();
    this.listarcorrelativos();

  }

  public cargarDatosTabla(): void {
    if(this.listarCorrelativo.length>0){
      this.dataSource = new MatTableDataSource(this.listarCorrelativo);
    }
  }

  listarcorrelativos(){
    this.correlativosService.listarCorrelativos().subscribe(
      (data: CorrelativoResponse[]) => {
        console.log(data);
        this.listarCorrelativo = data;
        this.cargarDatosTabla();
      },
      error => {
        console.log(error);
      }
    );
  }


  nuevoRegistro() {
    this.router.navigate(['/panel/correlativos/nuevo']);
  }

  editarRegistro(id: number) {
    this.router.navigate([`/panel/correlativos/editar/${id}`]);
  }

  verificarcookies() {
    if (!Cookie.get('inforegioncodigo')) {
      this.router.navigate(['/login']);
    }
  }

}
