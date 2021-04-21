import { Component, Input, OnInit, ViewChild, Inject, OnChanges, SimpleChanges } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material';
import { FirmanteRow } from '../../../model/firmanteRow';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { SesionTrabajoService } from 'src/app/services/sesion-trabajo.service';
import { FirmantesResponse } from 'src/app/dto/response/Firmantes.response';
import { ActivatedRoute } from '@angular/router';
import { saveConfig } from 'src/app/services/sweetAlertConfig';


@Component({
  selector: 'app-sesiones-firmante',
  templateUrl: './sesiones-firmante.component.html',
  styleUrls: ['./sesiones-firmante.component.scss']
})
export class SesionesFirmanteComponent implements OnInit, OnChanges {
  private sub: any;
  id: number;

  @Input()
  firmanteList = [];

  dataSource: MatTableDataSource<any> = null;
  // @Input()
  // firmanteList: FirmanteRow[];

  columnas: string[] = ['item', 'asistio', 'tipoDocumento', 'numeroDocumento', 'nombres', 'tipo', 'entidad'];
  // @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor(private spinnerService: NgxSpinnerService, private route: ActivatedRoute,
              @Inject(SesionTrabajoService) private sesionTrabajoService: SesionTrabajoService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params.id;
    });
    console.log('id de la sesion');
    console.log(this.id);

    // if (this.firmanteList.length > 0) {
    //   this.table.renderRows();
    // }

    // this.listarFirmanteActa();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // INICIA EL FORMUALRIO AQUI
    if (changes.firmanteList.currentValue) {
      this.cargarDatosTabla();
    }
  }

  agregarFirrmante() {
  }

  public cargarDatosTabla(): void {
    if (this.firmanteList.length > 0) {
      this.dataSource = new MatTableDataSource(this.firmanteList);
      // this.dataSource.paginator = this.paginator;
    }
  }

  eliminarFirmante(index: any) {
    this.spinnerService.show();
    setTimeout(() => {
      this.firmanteList.splice(index, 1);
      this.cargarDatosTabla();
      this.spinnerService.hide();
      Swal.fire({
        title: 'Eliminación!',
        text: 'Se eliminó el registro correctamnete el ' + index,
        confirmButtonText: 'Continuar'
      });
    }, 800);
  }


  listarFirmanteActa() {
    // LLAMAR A SERVICIO
    this.sesionTrabajoService.listarFirmanteActaSesionTrabajo(this.id).subscribe(
      (data: FirmantesResponse[]) => {
        console.log('DATA FIRMANTE');
        console.log(data);
        this.firmanteList = data;
      },
      error => {
        console.log(error);
      }
    );

    // dataSource
  }

  marcarAsistencia(row) {
    console.log(row.fIrmanteidpk);
    this.spinnerService.show();

    const formData = new FormData();
    formData.append('fIrmanteidpk', row.fIrmanteidpk);
    formData.append('actas', row.actas.aCtaidpk);
    formData.append('vEntidad', row.vEntidad);
    formData.append('vTipodocumento', row.vTipodocumento);
    formData.append('vNumerodocumento', row.vNumerodocumento);
    formData.append('vNombre', row.vNombre);
    formData.append('vTipo', row.vTipo);
    formData.append('cFlgasistio', row.cFlgasistio === '1' ? 0 + '' : 1 + '');

    console.log('FORM DATA');
    console.log(formData);
    this.sesionTrabajoService.marcarAsistenciaActaSesionTrabajo(formData)
    .subscribe(
      (data: FirmantesResponse) => {
        console.log(data);
        this.spinnerService.hide();
        Swal.fire(saveConfig).then((result) => {
          // this.router.navigate(['/panel/consejeros']);
        });
        this.listarFirmanteActa();
      }, error => {
        console.log(error);
      }
    );
  }



}
