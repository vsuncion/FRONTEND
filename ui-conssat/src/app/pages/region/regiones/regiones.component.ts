import { Component, OnInit, ViewChildren, Inject, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MaterialTablePaginator } from 'src/app/core/material.table.paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { EncargadoRegionService } from 'src/app/services/encargadoRegion.service';
import { EncargadoRegionResponse } from 'src/app/dto/response/EncargadoRegion.response';
import { FijasService } from 'src/app/services/fijas.service';
import { RegionResponse } from 'src/app/dto/response/Boletin.response';
import { deleteConfig } from 'src/app/services/sweetAlertConfig';
import Swal from 'sweetalert2';
import { HttpResponse } from '@angular/common/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ValidationService } from 'src/app/services/validation.service';

export interface Regiones {
  region: string;
  encargado: string;
  documento: string;
  fecha: string;
}

const ELEMENT_DATA: Regiones[] = [
  { region: 'REGION 1', encargado: 'MANUEL SALAZAR MARTINES', documento: 'RES-001-2020', fecha: '10/11/2020' },
  { region: 'REGION 2', encargado: 'PEDRO GERMAN OBLEA', documento: 'RES-002-2020', fecha: '10/11/2020' },
  { region: 'REGION 3', encargado: 'SAUL PEREZ AGUILAR', documento: 'RES-003-2020', fecha: '10/11/2020' },
  { region: 'REGION 4', encargado: 'FELIPE MENDOZA CAMINO', documento: 'RES-004-2020', fecha: '10/11/2020' }
];


@Component({
  selector: 'app-regiones',
  templateUrl: './regiones.component.html',
  styleUrls: ['./regiones.component.scss']
})
export class RegionesComponent implements OnInit {

  listaRegiones = [];
  regiones = [];

  displayedColumns: string[] = ['nro', 'region', 'encargado', 'documento', 'fecha', 'descargar', 'editar', 'eliminar'];

  dataSource: MatTableDataSource<any> = null;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  busquedaForm: FormGroup;

  constructor(private fb: FormBuilder, private spinnerService: NgxSpinnerService, private router: Router,
              @Inject(EncargadoRegionService) private encargadoRegionService: EncargadoRegionService,
              @Inject(FijasService) private fijasService: FijasService,private validationService: ValidationService) { }

  ngOnInit() {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      // INICIA EL FORMUALRIO AQUI
    }, 800);
    this.busquedaForm = this.fb.group({
      region: [''],
      encargado: [''],
      numdocumento: ['']
    });

    this.listarRegion();
    this.listarRegionesPais();
    this.verificarcookies();
  }

  public cargarDatosTabla(): void {
    if (this.listaRegiones.length > 0) {
      this.dataSource = new MatTableDataSource(this.listaRegiones);
      this.dataSource.paginator = this.paginator;
    }
  }

  listarRegion() {
    // LLAMAR A SERVICIO
    this.encargadoRegionService.listarRegion().subscribe(
      (data: EncargadoRegionResponse[]) => {
        console.log(data);
        this.listaRegiones = data;
        this.cargarDatosTabla();
      },
      error => {
        console.log(error);
      }
    );

    // dataSource
  }

  buscarEncargadoRegion() {
    // busquedaForm
    this.spinnerService.show();
    console.log('hola');
    let formData = new FormData();
    formData.append('regionpk', this.busquedaForm.get('region').value);
    formData.append('numerodocumento', this.busquedaForm.get('numdocumento').value);
    formData.append('nombre', this.busquedaForm.get('encargado').value);

    this.encargadoRegionService.buscarEncargadoRegion(formData).subscribe(
      (data: EncargadoRegionResponse[]) => {
        console.log(data);
        this.spinnerService.hide();
        this.listaRegiones = data;
        this.cargarDatosTabla();
      }, error => {
        console.log(error);
        this.spinnerService.hide();
      }
    );

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

  nuevoRegistro() {
    this.router.navigate(['/panel/regiones/nuevo']);
  }

  editarRegistro(id: number) {
    this.router.navigate([`/panel/regiones/editar/${id}`]);
  }

  eliminarRegistro(id: number) {
    this.spinnerService.show();

    this.encargadoRegionService.eliminarEncargadoRegion(id).subscribe(
      (data: EncargadoRegionResponse) => {
        console.log(data);
        setTimeout(() => {
          this.spinnerService.hide();
          Swal.fire(deleteConfig);
          this.listarRegion();
        }, 800);
      },
      error => {
        console.log(error);
      }
    );
  }

  decargarArchivo(id: number) {
    this.spinnerService.show();
    this.encargadoRegionService.descargarDocEncargadoRegion(id).subscribe(
      (data: HttpResponse<Blob>) => {
        this.spinnerService.hide();
        this.encargadoRegionService.descargarArchivo(data.body);
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
