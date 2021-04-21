import {Component, OnInit, ViewChild, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Location} from '@angular/common';
import {NgxSpinnerService} from 'ngx-spinner';
import {MatTable} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import { SeguimientoAcuerdoService } from 'src/app/services/seguimiento-acuerdo.service';
import { SeguimientoAcuerdoActaResponse } from 'src/app/dto/response/SeguimientoAcuerdoActa.response';
import { SeguimientoAcuerdoResponse } from 'src/app/dto/response/SeguimientoAcuerdo.response';
import { FijasService } from 'src/app/services/fijas.service';
import { TipoSesionesResponse } from 'src/app/dto/response/SesionTrabajo.response';
import { Cookie } from 'ng2-cookies/ng2-cookies';

interface AcuerdoRow {
  id: number;
  tema: string;
  responsable: string;
  entidad: string;
}

@Component({
  selector: 'app-seguimiento-acuerdos-por-acta',
  templateUrl: './seguimiento-acuerdos-por-acta.component.html',
  styleUrls: ['./seguimiento-acuerdos-por-acta.component.scss']
})
export class SeguimientoAcuerdosPorActaComponent implements OnInit {
  private sub: any;
  idActa: number;
  idSesion: number;

  busquedaForm: FormGroup;

  dataSource = [];

  tiposSesiones = [];

  acuerdosList: AcuerdoRow[] = [];
  columnas: string[] = ['item', 'tema', 'responsable', 'entidad', 'accion'];
  @ViewChild(MatTable, {static: true}) table: MatTable<any>;




  constructor(
    private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private location: Location,
    private spinner: NgxSpinnerService, private spinnerService: NgxSpinnerService,
    @Inject(SeguimientoAcuerdoService) private seguimientoAcuerdoService: SeguimientoAcuerdoService,
    @Inject(FijasService) private fijasService: FijasService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.idActa = params.idActa;
      this.idSesion = params.idSesion;
    });

    console.log('datos recuperados: ');
    console.log(this.idActa);
    console.log(this.idSesion);

    this.busquedaForm = this.fb.group({
      numeroSesion: ['', Validators.required],
      numeroActa: ['', Validators.required],
      tipoSesion: ['', Validators.required],
      fechaActa: ['', Validators.required],
    });
    // this.loadDEfaultData();
    this.busquedaForm.disable();
    // this.idSesion = this.route.snapshot.params['idSesion'];
    // this.idActa = this.route.snapshot.params['idActa'];

    this.listarSeguimientoAcuerdo();
    this.obtenerSeguimientoAcuerdo();
    this.listarTipoSesion();
    this.verificarcookies();
  }

  listarSeguimientoAcuerdo() {
    // LLAMAR A SERVICIO
    this.seguimientoAcuerdoService.listarSeguimientoAcuerdoAccion(this.idActa).subscribe(
      (data: SeguimientoAcuerdoActaResponse[]) => {
        console.log(data);
        this.dataSource = data;
      },
      error => {
        console.log(error);
      }
    );

    // dataSource
  }

  obtenerSeguimientoAcuerdo() {
    this.seguimientoAcuerdoService.buscarSeguimientoPorId(this.idActa).subscribe(
      (data: SeguimientoAcuerdoResponse) => {
        console.log('BUSQUEDA POR ID');
        console.log(data);
        this.busquedaForm.setValue({
          numeroSesion: data.sesionfk.vCodsesion,
          numeroActa: data.vCodacta,
          tipoSesion: data.sesionfk.tipoSesiones.tIposesionidpk,
          fechaActa: data.dFecacta ? new Date(data.dFecacta.toString().replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3')) : '',

        });
        this.spinnerService.hide();
      }, error => {
        console.log(error);
        this.spinnerService.hide();
      }
    );
  }

  // loadDEfaultData() {
  //   this.spinner.show();
  //   setTimeout(() => {
  //     this.busquedaForm.setValue({
  //       numeroSesion: '0-20-90898990',
  //       numeroActa: 'ACTA-2020-90898990',
  //       tipoSesion: '02',
  //       fechaActa: new Date()
  //     });

  //     this.acuerdosList.push({
  //       id: 1001,
  //       tema: 'ACUERDO 1 CON DESCRIPCIÓN GENÉRICA',
  //       responsable: 'CARLOA AZUSTRE',
  //       entidad: 'SUNAT'
  //     });
  //     this.acuerdosList.push({
  //       id: 1002,
  //       tema: 'ACUERDO 2 CON DESCRIPCIÓN GENÉRICA',
  //       responsable: 'PEPE LUNA',
  //       entidad: 'ONPE'
  //     });
  //     this.acuerdosList.push({
  //       id: 1003,
  //       tema: 'ACUERDO 3 CON DESCRIPCIÓN GENÉRICA',
  //       responsable: 'CARLOS OLIVARES',
  //       entidad: 'SUNAT'
  //     });
  //     this.table.renderRows();
  //     this.spinner.hide();
  //   }, 800);
  // }

  cancelar() {
    this.location.back();
  }

  agergarAccion(idAcuerdo: any) {
    this.router.navigate(['/panel/seguimiento-de-acuerdos/' + this.idSesion + '/acta/' + this.idActa + '/acuerdo/' + idAcuerdo + '/accion/nuevo']);
  }

  listarTipoSesion() {
    this.fijasService.listarTipoSesion().subscribe(
      (data: TipoSesionesResponse[]) => {
        console.log(data);
        this.tiposSesiones = data;
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
