import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { deleteConfig } from '../../../services/sweetAlertConfig';
import { InformesGestionService } from 'src/app/services/informes- gestion.service';
import { InformeAnualResponse } from 'src/app/dto/response/InformeAnual.response';
import { DatePipe } from '@angular/common';
import { ValidationService } from 'src/app/services/validation.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { MatTableDataSource, MatPaginator } from '@angular/material';

interface InformeRow {

  id: number;
  numeroInforme: string;
  numeroSesion: string;
  fecha: string;
  documento: string;

}


@Component({
  selector: 'app-informes-anuales',
  templateUrl: './informes-anuales.component.html',
  styleUrls: ['./informes-anuales.component.scss']
})
export class InformesAnualesComponent implements OnInit {

  busquedaForm: FormGroup;

  listaInformesAnuales = [];
  dataSource: MatTableDataSource<any> = null;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  displayedColumns: string[] = ['nro', 'numeroInforme', 'numeroSesion', 'documento', 'fecha', 'ver', 'editar', 'eliminar'];

  constructor(private fb: FormBuilder, private spinnerService: NgxSpinnerService, private router: Router,
              @Inject(InformesGestionService) private informesGestionService: InformesGestionService,
              private datePipe: DatePipe,
              @Inject(ValidationService) private validationService: ValidationService) {
  }

  ngOnInit() {

    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      // INICIA EL FORMUALRIO AQUI
    }, 800);

    this.busquedaForm = this.fb.group({
      comision: [''],
      numeroInforme: [''],
      numeroSesion: [''],
      numeroDocumento: [''],
      fechaInicio: [''],
      fechaFin: [''],
    });

    this.listarInformesAnuales();
    this.verificarcookies();
  }

  public cargarDatosTabla(): void {
    if (this.listaInformesAnuales.length > 0) {
      this.dataSource = new MatTableDataSource(this.listaInformesAnuales);
      this.dataSource.paginator = this.paginator;
    } else {
      this.listaInformesAnuales = [];
      this.dataSource = new MatTableDataSource(this.listaInformesAnuales);
      this.dataSource.paginator = this.paginator;
    }
  }

  listarInformesAnuales() {
    // LLAMAR A SERVICIO
    this.informesGestionService.listarInformeAnual().subscribe(
      (data: InformeAnualResponse[]) => {
        console.log(data);
        this.listaInformesAnuales = data;
        this.cargarDatosTabla();
      },
      error => {
        console.log(error);
      }
    );
    // dataSource
  }

  buscarInformesAnuales() {
    // busquedaForm
    this.spinnerService.show();
    console.log('buscar informes anuales');
    let formData = new FormData();
    formData.append('comision', this.busquedaForm.get('comision').value);
    formData.append('vCodinforme', this.busquedaForm.get('numeroInforme').value);
    formData.append('vSesion', this.busquedaForm.get('numeroSesion').value);
    formData.append('vNumdocap', this.busquedaForm.get('numeroDocumento').value);
    formData.append('dFecdesde', this.datePipe.transform(this.busquedaForm.get('fechaInicio').value, 'dd-MM-yyyy'));
    formData.append('dFhasta', this.datePipe.transform(this.busquedaForm.get('fechaFin').value, 'dd-MM-yyyy'));

    this.informesGestionService.buscarInformeAnual(formData).subscribe(
      (data: InformeAnualResponse[]) => {
        console.log(data);
        this.spinnerService.hide();
        this.listaInformesAnuales = data;
        this.cargarDatosTabla();
      }, error => {
        console.log(error);
        this.spinnerService.hide();
      }
    );

  }

  verRegistro(id: any) {
    this.router.navigate(['/panel/informes-anuales/ver/' + id]);
  }

  editarRegistro(id: any) {
    this.router.navigate(['/panel/informes-anuales/editar/' + id]);
  }

  eliminarRegistro(id: number) {
    this.spinnerService.show();

    this.informesGestionService.eliminarInformeAnual(id).subscribe(
      (data: InformeAnualResponse) => {
        console.log(data);
        setTimeout(() => {
          this.spinnerService.hide();
          Swal.fire(deleteConfig);
          this.listarInformesAnuales();
        }, 800);
      },
      error => {
        console.log(error);
      }
    );
  }

  nuevoRegistro() {
    this.router.navigate(['/panel/informes-anuales/nuevo']);
  }

  decargarArchivo(archivo: any) {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      Swal.fire({
        title: 'Descarga Completa!',
        confirmButtonText: 'Continuar'
      });
    }, 800);
  }

  limpiarRegistro() {
    this.validationService.setAsUntoched(this.busquedaForm);
  }
  verificarcookies() {
    if (!Cookie.get('inforegioncodigo')) {
      this.router.navigate(['/login']);
    }
  }
  verificarrol() {
    if (Cookie.get('idrol') === 'ROLE_OPECONSSAT' || Cookie.get('idrol') === 'ROLE_OPECORSSAT') {
       return true;
    } else {
      return false;
    }
  }
}
