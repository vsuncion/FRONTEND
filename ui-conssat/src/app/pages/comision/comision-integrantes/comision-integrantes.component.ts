import { Component, OnInit, ViewChildren, Inject } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MaterialTablePaginator } from 'src/app/core/material.table.paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { ComisionesService } from 'src/app/services/comisiones.service';
import { ComisionesResponse } from 'src/app/dto/response/Comisiones.response';
import { HttpResponse } from '@angular/common/http';
import { ComisionConsejoResponse } from 'src/app/dto/response/ComisionConsejo.response';
import Swal from 'sweetalert2';
import { deleteConfig } from 'src/app/services/sweetAlertConfig';
import { Cookie } from 'ng2-cookies/ng2-cookies';

export interface Integrantes {
  integrante: string;
  tipo: string;
  desde: string;
  hasta: string;
}

const ELEMENT_DATA: Integrantes[] = [
  { integrante: 'MANUEL SALAZAR MARTINES', tipo: 'TITULAR',      desde:  '10/10/2020', hasta: '10/10/2020'},
  { integrante: 'PEDRO GERMAN OBLEA',      tipo: 'ALTERNO',  desde: '10/10/2020',  hasta: '10/10/2020'},
  { integrante: 'SAUL PEREZ AGUILAR',      tipo: 'ALTERNO',     desde: '10/10/2020',  hasta: '10/10/2020'},
  { integrante: 'FELIPE MENDOZA CAMINO',   tipo: 'ALTERNO',     desde: '10/10/2020',  hasta: '10/10/2020'}
];

@Component({
  selector: 'app-comision-integrantes',
  templateUrl: './comision-integrantes.component.html',
  styleUrls: ['./comision-integrantes.component.scss']
})
export class ComisionIntegrantesComponent implements OnInit {
  private sub: any;
  id: number;
  dataSource = [];

  displayedColumns: string[] = [ 'integrante', 'tipo', 'desde', 'hasta', 'ver', 'editar', 'eliminar'];

    @ViewChildren(MatPaginator) paginator: MatPaginator;

  busquedaForm: FormGroup;
  constructor(private fb: FormBuilder, private spinnerService: NgxSpinnerService, private router: Router,
              private route: ActivatedRoute,
              @Inject(ComisionesService) private comisionesService: ComisionesService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      // INICIA EL FORMUALRIO AQUI
      this.busquedaForm.disable();
    }, 800);

    this.busquedaForm = this.fb.group({
      vcomision: [''],
      vencargado: [''],
      numdocumentoaprob: [''],
      vfechadoc: [''],
      vtpcomision: [''],
      vfechainicio: [''],
      vfechafin: [''],
    });

    this.obtenerComision();
    this.listarIntegrantesComision();
    this.verificarcookies();
  }

  obtenerComision() {
    this.comisionesService.buscarComisionPorId(this.id).subscribe(
      (data: ComisionesResponse) => {
        console.log('BUSQUEDA POR ID');
        console.log(data);
        this.busquedaForm.setValue({
          vcomision: data.vCodcomision,
          vencargado: data.consejero.vDesnombre + ' ' + data.consejero.vDesappaterno + ' ' + data.consejero.vDesapmaterno,
          numdocumentoaprob: data.vNumdocapr,
          vfechadoc: data.dFecdocapr ? new Date(data.dFecdocapr.toString().replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3')) : '',
          vtpcomision: data.tipocomision.vDesnombre,
          vfechainicio: data.dFecinicio ? new Date(data.dFecinicio.toString().replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3')) : '',
          vfechafin: data.dFecfin ? new Date(data.dFecfin.toString().replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3')) : '',
        });
      }, error => {
        console.log(error);
      }
    );
  }

  listarIntegrantesComision() {
    // LLAMAR A SERVICIO
    this.comisionesService.listarIntegrantesComision(this.id).subscribe(
      (data: ComisionConsejoResponse[]) => {
        console.log(data);
        this.dataSource = data;
      },
      error => {
        console.log(error);
      }
    );

    // dataSource
  }

  ver(idIntegrante: any) {
    this.router.navigate([`/panel/comisiones/${this.id}/integrantes/ver/${idIntegrante}`]);
  }

  editarRegistro(idIntegrante: any) {
    this.router.navigate([`/panel/comisiones/${this.id}/integrantes/editar/${idIntegrante}`]);
  }

  decargarArchivo() {
    this.spinnerService.show();
    this.comisionesService.descargarDocAcuerdo(this.id).subscribe(
      (data: HttpResponse<Blob>) => {
        this.spinnerService.hide();
        this.comisionesService.descargarArchivo(data.body);
      }, error => {
        console.log(error);
      }
    );
  }

  cancelar() {
    this.router.navigate(['/panel/comisiones']);

  }

  eliminarRegistro(id: number) {
    this.spinnerService.show();

    this.comisionesService.eliminarIntegrante(id).subscribe(
      (data: ComisionConsejoResponse) => {
        console.log(data);
        setTimeout(() => {
          this.spinnerService.hide();
          Swal.fire(deleteConfig);
          this.listarIntegrantesComision();
        }, 800);
      },
      error => {
        console.log(error);
      }
    );
  }

  verificarcookies() {
    if (!Cookie.get('inforegioncodigo') ) {
      this.router.navigate(['/login']);
    }
  }

}
