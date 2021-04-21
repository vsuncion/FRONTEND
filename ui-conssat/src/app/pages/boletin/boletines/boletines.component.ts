import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { deleteConfig } from '../../../services/sweetAlertConfig';
import { BoletinesService } from 'src/app/services/boletines.service';
import { BoletinResponse } from 'src/app/dto/response/Boletin.response';
import { BoletinEntidadEliminarResponse } from 'src/app/dto/response/BoletinEntidadEliminar.response';
import { BuscarBoletinRequest } from 'src/app/dto/request/BuscarBoletines.request';
import { DatePipe } from '@angular/common';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ValidationService } from 'src/app/services/validation.service';

interface ConsejerRowResponse {

  id: number;
  numeroBoletin: string;
  fecha: string;

}

@Component({
  selector: 'app-boletines',
  templateUrl: './boletines.component.html',
  styleUrls: ['./boletines.component.scss']
})
export class BoletinesComponent implements OnInit {
  listaBoletines = [];

  dataSource: MatTableDataSource<any> = null;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  busquedaForm: FormGroup;

  displayedColumns: string[] = ['item', 'numeroBoletin', 'fecha', 'ver', 'editar', 'eliminar'];

  constructor(private fb: FormBuilder, private spinnerService: NgxSpinnerService, private router: Router,
              private datePipe: DatePipe,
              @Inject(BoletinesService) private boletinesService: BoletinesService, private validationService: ValidationService) {
  }

  ngOnInit() {

    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      // INICIA EL FORMUALRIO AQUI
    }, 800);

    this.busquedaForm = this.fb.group({
      numeroBoletin: [''],
      fechaInicioBoletin: [''],
      fechaFinBoletin: [''],
    });

    this.listarBoletines();
    this.verificarcookies();
  }

  public cargarDatosTabla(): void {
    if (this.listaBoletines.length > 0) {
      this.dataSource = new MatTableDataSource(this.listaBoletines);
      this.dataSource.paginator = this.paginator;
    } else {
      this.listaBoletines = [];
      this.dataSource = new MatTableDataSource(this.listaBoletines);
      this.dataSource.paginator = this.paginator;
    }
  }

  listarBoletines() {
    // LLAMAR A SERVICIO
    this.boletinesService.listarBoletin().subscribe(
      (data: BoletinResponse[]) => {
        console.log(data);
        this.listaBoletines = data;
        this.cargarDatosTabla();
      },
      error => {
        console.log(error);
      }
    );

    // dataSource
  }

  buscarBoletin() {
    // busquedaForm
    this.spinnerService.show();
    console.log('buscar informes anuales');
    const req = new BuscarBoletinRequest();
    req.vNumbol = this.busquedaForm.get('numeroBoletin').value;
    req.vFecdesde = this.datePipe.transform(this.busquedaForm.get('fechaInicioBoletin').value, 'dd-MM-yyyy');
    req.vFechasta = this.datePipe.transform(this.busquedaForm.get('fechaFinBoletin').value, 'dd-MM-yyyy');
    console.log(req);

    this.boletinesService.buscarBoletin(req).subscribe(
      (data: BoletinResponse[]) => {
        console.log(data);
        this.spinnerService.hide();
        this.listaBoletines = data;
        this.cargarDatosTabla();
      }, error => {
        console.log(error);
        this.spinnerService.hide();
        Swal.fire({
          icon: 'error',
          title: error.error.error
        });
      }
    );

  }

  verRegistro(id: any) {
    this.router.navigate(['/panel/boletines/ver/' + id]);
  }

  editarRegistro(id: any) {
    this.router.navigate(['/panel/boletines/editar/' + id]);
  }

  // eliminarRegistro(codigoContrato: any) {
  //   this.spinnerService.show();
  //   setTimeout(() => {
  //     this.spinnerService.hide();
  //     Swal.fire(deleteConfig);
  //   }, 800);
  // }

  nuevoRegistro() {
    this.router.navigate(['/panel/boletines/nuevo']);
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

  eliminarRegistro(id: number) {
    this.spinnerService.show();

    this.boletinesService.eliminarBoletin(id).subscribe(
      (data: BoletinEntidadEliminarResponse) => {
        console.log(data);
        setTimeout(() => {
          this.spinnerService.hide();
          Swal.fire(deleteConfig);
          this.listarBoletines();
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
