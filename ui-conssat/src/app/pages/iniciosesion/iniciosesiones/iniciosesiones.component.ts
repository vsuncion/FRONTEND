import { Component, OnInit, ViewChildren, Inject, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MaterialTablePaginator } from 'src/app/core/material.table.paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { InicioSesionService } from 'src/app/services/inicio-sesion.service';
import { FijasService } from 'src/app/services/fijas.service';
import { InicioSesionResponse } from 'src/app/dto/response/InicioSesion.response';
import { TipoDocumentoResponse } from 'src/app/dto/response/RegistrarInvitado.response';
import { RegionResponse } from 'src/app/dto/response/Boletin.response';
import Swal from 'sweetalert2';
import { deleteConfig } from 'src/app/services/sweetAlertConfig';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ValidationService } from 'src/app/services/validation.service';

export interface Usuarios {
  region: string;
  nombre: string;
  correo: string;
  estado: string;
}

const ELEMENT_DATA: Usuarios[] = [
  { region: 'LIMA', nombre: 'MANUEL SALAZAR MARTINES', correo: 'correo1@hotmail.com', estado: 'ACTIVO' },
  { region: 'AREQUIPA', nombre: 'PEDRO GERMAN OBLEA', correo: 'correo2@hotmail.com', estado: 'ACTIVO' },
  { region: 'PIURA', nombre: 'SAUL PEREZ AGUILAR', correo: 'correo3@hotmail.com', estado: 'ACTIVO' },
  { region: 'TACNA', nombre: 'FELIPE MENDOZA CAMINO', correo: 'correo4@hotmail.com', estado: 'INACTIVO' }
];


@Component({
  selector: 'app-iniciosesiones',
  templateUrl: './iniciosesiones.component.html',
  styleUrls: ['./iniciosesiones.component.scss']
})
export class IniciosesionesComponent implements OnInit {

  regiones = [];
  documentosTipo = [];

  listaUsuarios = [];
  dataSource: MatTableDataSource<any> = null;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  displayedColumns: string[] = ['region', 'nombre', 'correo', 'estado','rol_asignado', 'rol', 'editar', 'eliminar'];


  busquedaForm: FormGroup;
  constructor(private fb: FormBuilder, private spinnerService: NgxSpinnerService, private router: Router,
              @Inject(InicioSesionService) private inicioSesionService: InicioSesionService,
              @Inject(FijasService) private fijasService: FijasService,private validationService: ValidationService) { }

  ngOnInit() {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      // INICIA EL FORMUALRIO AQUI
    }, 800);

    this.busquedaForm = this.fb.group({
      nombre: [''],
      apepaterno: [''],
      apematerno: [''],
      region: [''],
      numdocumento: [''],
      tpdocumento: [''],
    });

    this.listarRegionesPais();
    this.listarDocumentos();
    this.listarUsuario();
    this.verificarcookies();
  }

  public cargarDatosTabla(): void {
      this.dataSource = new MatTableDataSource(this.listaUsuarios);
      this.dataSource.paginator = this.paginator;
  }

  listarUsuario() {
    // LLAMAR A SERVICIO
    this.inicioSesionService.listarUsuarioInicSesion().subscribe(
      (data: InicioSesionResponse[]) => {
        console.log(data);
        this.listaUsuarios = data;
        this.cargarDatosTabla();
      },
      error => {
        console.log(error);
      }
    );

    // dataSource
  }

  buscarUsuario() {
    // busquedaForm
    this.spinnerService.show();
    console.log('hola');
    let formData = new FormData();
    formData.append('tipodocumento', this.busquedaForm.get('tpdocumento').value);
    formData.append('numerodocumento', this.busquedaForm.get('numdocumento').value);
    formData.append('nombre', this.busquedaForm.get('nombre').value);
    formData.append('apellidopaterno', this.busquedaForm.get('apepaterno').value);
    formData.append('apellidomaterno', this.busquedaForm.get('apematerno').value);
    formData.append('region', this.busquedaForm.get('region').value);

    this.inicioSesionService.buscarUsuarioInicSesion(formData).subscribe(
      (data: InicioSesionResponse[]) => {
        console.log(data);
        this.spinnerService.hide();
        this.listaUsuarios = data;
        this.cargarDatosTabla();
      }, error => {
        console.log(error);
        this.spinnerService.hide();
      }
    );

  }

  nuevoRegistro() {
    this.router.navigate(['/panel/seguridad/nuevo']);
  }

  editarRegistro(id: number) {
    this.router.navigate([`/panel/seguridad/editar/${id}`]);
  }

  rolRegistro(id: number) {
    this.router.navigate([`/panel/seguridad/rol/${id}`]);
  }


  listarDocumentos() {
    this.fijasService.listarTipoDocumento().subscribe(
      (data: TipoDocumentoResponse[]) => {
        console.log(data);
        this.documentosTipo = data;
      },
      error => {
        console.log(error);
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

  eliminarRegistro(id: number) {
    this.spinnerService.show();

    this.inicioSesionService.eliminarUsuarioInicSesion(id).subscribe(
      (data: InicioSesionResponse) => {
        console.log(data);
        setTimeout(() => {
          this.spinnerService.hide();
          Swal.fire(deleteConfig);
          this.listarUsuario();
        }, 800);
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


  limpiarRegistro() {
    this.validationService.setAsUntoched(this.busquedaForm);
  }
}
