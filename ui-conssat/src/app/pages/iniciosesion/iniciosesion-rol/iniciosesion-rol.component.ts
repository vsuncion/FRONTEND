import { Component, OnInit, ViewChildren, Inject } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MaterialTablePaginator } from 'src/app/core/material.table.paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { InicioSesionService } from 'src/app/services/inicio-sesion.service';
import { InicioSesionRolResponse, RolesResponse } from 'src/app/dto/response/InicioSesionRol.response';
import { InicioSesionResponse } from 'src/app/dto/response/InicioSesion.response';
import { FijasService } from 'src/app/services/fijas.service';
import { saveConfig } from 'src/app/services/sweetAlertConfig';
import Swal from 'sweetalert2';

export interface Roles {
  nombrerol: string;
  fecharegistro: string;
  estado: string;
}

const ELEMENT_DATA: Roles[] = [
  { nombrerol: 'MANUEL SALAZAR MARTINES', fecharegistro: 'RES-001-2020', estado: 'ACTIVO' },
  { nombrerol: 'PEDRO GERMAN OBLEA', fecharegistro: 'RES-002-2020', estado: 'ACTIVO' },
  { nombrerol: 'SAUL PEREZ AGUILAR', fecharegistro: 'RES-003-2020', estado: 'ACTIVO' },
  { nombrerol: 'FELIPE MENDOZA CAMINO', fecharegistro: 'RES-004-2020', estado: 'ACTIVO' }
];

@Component({
  selector: 'app-iniciosesion-rol',
  templateUrl: './iniciosesion-rol.component.html',
  styleUrls: ['./iniciosesion-rol.component.scss']
})
export class IniciosesionRolComponent implements OnInit {
  private sub: any;
  id: number;

  rolesTipo = [];
  displayedColumns: string[] = ['nombrerol', 'fecharegistro', 'estado', 'activar'];
  dataSource = [];
  @ViewChildren(MatPaginator) paginator: MatPaginator;

  busquedaForm: FormGroup;
  constructor(private fb: FormBuilder, private spinnerService: NgxSpinnerService, private router: Router,
              private route: ActivatedRoute,
              @Inject(InicioSesionService) private inicioSesionService: InicioSesionService,
              @Inject(FijasService) private fijasService: FijasService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

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
      correo: [''],
      fecregistro: [''],
      rol: [''],
    });
    this.verificarcookies();
    this.listarInicioSesionRol();
    this.obtenerInicioSesion();
    this.listarTipoRol();
  }

  listarInicioSesionRol() {
    // LLAMAR A SERVICIO
    this.inicioSesionService.listarInicSesionRol(this.id).subscribe(
      (data: InicioSesionRolResponse[]) => {
        console.log(data);
        this.dataSource = data;
      },
      error => {
        console.log(error);
      }
    );

    // dataSource
  }

  obtenerInicioSesion() {
    this.inicioSesionService.buscarUsuarioInicSesionPorId(this.id).subscribe(
      (data: InicioSesionResponse) => {
        console.log('BUSQUEDA POR ID');
        console.log(data);
        this.busquedaForm.get('region').setValue(data.regiones.vDesnombre);
        this.busquedaForm.get('nombre').setValue(data.vNombre);
        this.busquedaForm.get('apepaterno').setValue(data.vAppaterno);
        this.busquedaForm.get('apematerno').setValue(data.vApmaterno);
        this.busquedaForm.get('correo').setValue(data.username);
        this.busquedaForm.get('fecregistro').setValue(data.dFecreg);

      }, error => {
        console.log(error);
      }
    );
  }

  guardar() {
    let formData = new FormData();
    formData.append('idusuario', this.id + '');
    formData.append('idrol', this.busquedaForm.get('rol').value);

    this.spinnerService.show();
    this.inicioSesionService.registrarInicSesionRol(formData).subscribe(
      (data: InicioSesionRolResponse) => {
        console.log(data);
        setTimeout(() => {
          this.spinnerService.hide();
          Swal.fire(saveConfig).then((result) => {
            this.listarInicioSesionRol();
          });
        }, 800);
      }, error => {
        console.log(error);
        this.spinnerService.hide();
        Swal.fire({
          icon: 'error',
          title: error.error.mensaje,
          text: error.error.error,
        });
      }
    );
  }

  verificarcookies() {
    if (!Cookie.get('inforegioncodigo')) {
      this.router.navigate(['/login']);
    }
  }

  listarTipoRol() {
    this.fijasService.listarTipoRol().subscribe(
      (data: RolesResponse[]) => {
        console.log(data);
        this.rolesTipo = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  habilitarRol(idUsuarioRol: number) {
    this.inicioSesionService.habilitarRol(idUsuarioRol).subscribe(
      (data: InicioSesionRolResponse) => {
        console.log(data);
        this.listarInicioSesionRol();
      },
      error => {
        console.log(error);
      }
    );
  }

  desabilitarRol(idUsuarioRol: number) {
    this.inicioSesionService.desabilitarRol(idUsuarioRol).subscribe(
      (data: InicioSesionRolResponse) => {
        console.log(data);
        this.listarInicioSesionRol();
      },
      error => {
        console.log(error);
      }
    );
  }

  cancelar() {
    this.router.navigate(['/panel/seguridad']);
  }

}
