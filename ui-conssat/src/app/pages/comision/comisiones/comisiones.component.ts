import { Component, OnInit, ViewChildren, Inject, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MaterialTablePaginator } from 'src/app/core/material.table.paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ComisionesService } from 'src/app/services/comisiones.service';
import { ComisionesResponse } from 'src/app/dto/response/Comisiones.response';
import { backendUrl } from 'src/app/common';
import { deleteConfig } from 'src/app/services/sweetAlertConfig';
import Swal from 'sweetalert2';
import { BuscarComisionRequest } from 'src/app/dto/request/BuscarComision.request';
import { HttpResponse } from '@angular/common/http';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ValidationService } from 'src/app/services/validation.service';


export interface Comisiones {
  codigo: number;
  nombre: string;
  encargado: string;
  documento: string;
  fecha: string;
}

const ELEMENT_DATA: Comisiones[] = [
  { codigo: 1, nombre: 'COMISIÓN 1', encargado: 'MANUEL SALAZAR MARTINES', documento: 'RES-001-2020', fecha: '10/11/2020' },
  { codigo: 2, nombre: 'COMISIÓN 2', encargado: 'PEDRO GERMAN OBLEA', documento: 'RES-002-2020', fecha: '10/11/2020' },
  { codigo: 3, nombre: 'COMISIÓN 3', encargado: 'SAUL PEREZ AGUILAR', documento: 'RES-003-2020', fecha: '10/11/2020' },
  { codigo: 4, nombre: 'COMISIÓN 4', encargado: 'FELIPE MENDOZA CAMINO', documento: 'RES-004-2020', fecha: '10/11/2020' }
];

@Component({
  selector: 'app-comisiones',
  templateUrl: './comisiones.component.html',
  styleUrls: ['./comisiones.component.scss']
})
export class ComisionesComponent implements OnInit {
  displayedColumns: string[] = ['codigo', 'nombre', 'encargado', 'integrantes', 'documento', 'fecha', 'descripcion', 'descargar', 'editar', 'eliminar'];
  listaComisiones = [];

  busquedaForm: FormGroup;

  dataSource: MatTableDataSource<any> = null;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private fb: FormBuilder, private spinnerService: NgxSpinnerService, private router: Router,
              @Inject(ComisionesService) private comisionesService: ComisionesService,
              @Inject(AutenticacionService) private autenticacionService: AutenticacionService,
              private validationService: ValidationService) { }

  ngOnInit() {
    this.autenticacionService.existeToken();
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      // INICIA EL FORMUALRIO AQUI
    }, 800);

    this.busquedaForm = this.fb.group({
      comision: [''],
      encargado: [''],
      docAprobacion: [''],
      descripcion: ['']
    });

    this.listarComision();
    this.verificarcookies();
  }

  public cargarDatosTabla(): void {
    if (this.listaComisiones.length > 0) {
      this.dataSource = new MatTableDataSource(this.listaComisiones);
      this.dataSource.paginator = this.paginator;
    } else {
      this.listaComisiones = [];
      this.dataSource = new MatTableDataSource(this.listaComisiones);
      this.dataSource.paginator = this.paginator;
    }
  }

  listarComision() {
    // LLAMAR A SERVICIO
    this.comisionesService.listarComisiones().subscribe(
      (data: ComisionesResponse[]) => {
        console.log(data);
        this.listaComisiones = data;
        this.cargarDatosTabla();
      },
      error => {
        console.log(error);
      }
    );

    // listaComisiones
  }

  buscarComision() {
    // busquedaForm
    this.spinnerService.show();
    console.log('buscar comisiones');
    let req = new BuscarComisionRequest();
    req.vCodcomision = this.busquedaForm.get('comision').value;
    req.nombrencargado = this.busquedaForm.get('encargado').value;
    req.vNumdocapr = this.busquedaForm.get('docAprobacion').value;
    req.vDescripcion = this.busquedaForm.get('descripcion').value;
    console.log(req);

    this.comisionesService.buscarComision(req).subscribe(
      (data: ComisionesResponse[]) => {
        console.log(data);
        this.spinnerService.hide();
        this.listaComisiones = data;
        this.cargarDatosTabla();
      }, error => {
        console.log(error);
        this.spinnerService.hide();
      }
    );

  }


  nuevoRegistro() {
    this.router.navigate(['/panel/comisiones/nuevo']);
  }

  editarRegistro(id: number) {
    this.router.navigate([`/panel/comisiones/editar/${id}`]);
  }

  // decargarArchivo(id: number){
  //   window.open(`${backendUrl}api/comisiones/descargar/${id}`);
  // }

  // debe insertarse codigo comision en id
  registrarlistarintegrantes(id: any) {
    this.router.navigate([`/panel/comisiones/${id}/integrantes`]);
  }

  eliminarRegistro(id: number) {
    this.spinnerService.show();

    this.comisionesService.eliminarComision(id).subscribe(
      (data: ComisionesResponse) => {
        console.log(data);
        setTimeout(() => {
          this.spinnerService.hide();
          Swal.fire(deleteConfig);
          this.listarComision();
        }, 800);
      },
      error => {
        console.log(error);
      }
    );
  }

  decargarArchivo(id: number) {
    this.spinnerService.show();
    this.comisionesService.descargarDocAcuerdo(id).subscribe(
      (data: HttpResponse<Blob>) => {
        this.spinnerService.hide();
        this.comisionesService.descargarArchivo(data.body);
      }, error => {
        console.log(error);
      }
    );
  }

  verificarcookies() {
    if (!Cookie.get('inforegioncodigo')) {
      this.router.navigate(['/login']);
    }
  }

  limpiarRegistro() {
    this.validationService.setAsUntoched(this.busquedaForm);
  }

}
