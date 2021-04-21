import { Component, OnInit, ViewChildren, Inject } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MaterialTablePaginator } from 'src/app/core/material.table.paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { InicioSesionService } from 'src/app/services/inicio-sesion.service';
import { FijasService } from 'src/app/services/fijas.service';
import { TipoDocumentoResponse } from 'src/app/dto/response/RegistrarInvitado.response';
import { RegionResponse } from 'src/app/dto/response/Boletin.response';
import { InicioSesionResponse } from 'src/app/dto/response/InicioSesion.response';
import Swal from 'sweetalert2';
import { editConfig } from 'src/app/services/sweetAlertConfig';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-iniciosesion-editar',
  templateUrl: './iniciosesion-editar.component.html',
  styleUrls: ['./iniciosesion-editar.component.scss']
})
export class IniciosesionEditarComponent implements OnInit {
  private sub: any;
  id: number;

  regiones = [];
  documentosTipo = [];
  busquedaForm: FormGroup;
  constructor(private fb: FormBuilder, private spinnerService: NgxSpinnerService, private router: Router,
              private route: ActivatedRoute,
              @Inject(InicioSesionService) private inicioSesionService: InicioSesionService,
              @Inject(FijasService) private fijasService: FijasService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params.id;
    });

    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      // INICIA EL FORMUALRIO AQUI
    }, 800);

    this.busquedaForm = this.fb.group({
      region: [''],
      tpdocumento: [''],
      numeroDocumento: [''],
      nombres: [''],
      apellidoPaterno: [''],
      apellidoMaterno: [''],
      correo: [''],
     clave: [''],
    });

    this.listarRegionesPais();
    this.listarDocumentos();
    this.obtenerInicioSesion();
    this.verificarcookies();
  }

  obtenerInicioSesion() {
    this.inicioSesionService.buscarUsuarioInicSesionPorId(this.id).subscribe(
      (data: InicioSesionResponse) => {
        console.log('BUSQUEDA POR ID');
        console.log(data);
        this.busquedaForm.setValue({
          region: data.regiones.rEgionidpk,
          tpdocumento: data.tipodocumento.tPdocumentoidpk,
          numeroDocumento: data.vNumdocumento,
          nombres: data.vNombre,
          apellidoPaterno: data.vAppaterno,
          apellidoMaterno: data.vApmaterno,
          correo: data.username,
         // clave: data.password,
         clave: ""
        });
      }, error => {
        console.log(error);
      }
    );
  }

  guardar() {
    const formData = new FormData();
    formData.append('region', this.busquedaForm.get('region').value);
    formData.append('tipodocumento', this.busquedaForm.get('tpdocumento').value);
    formData.append('vNumdocumento', this.busquedaForm.get('numeroDocumento').value);
    formData.append('vNombre', this.busquedaForm.get('nombres').value);
    formData.append('vAppaterno', this.busquedaForm.get('apellidoPaterno').value);
    formData.append('vApmaterno', this.busquedaForm.get('apellidoMaterno').value);
    formData.append('vCorreo', this.busquedaForm.get('correo').value);
    formData.append('vClave', this.busquedaForm.get('clave').value);
    formData.append('idusuario', this.id + '');

    this.spinnerService.show();
    this.inicioSesionService.actualizarUsuarioInicSesion(formData).subscribe(
      (data: InicioSesionResponse) => {
        console.log(data);
        setTimeout(() => {
          this.spinnerService.hide();
          Swal.fire(editConfig).then((result) => {
            this.router.navigate(['/panel/seguridad']);
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

  cancelar() {
    this.router.navigate(['/panel/seguridad']);

  }
  verificarcookies() {
    if (!Cookie.get('inforegioncodigo') ) {
      this.router.navigate(['/login']);
    }
  }
}
