import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MatTableDataSource, MatPaginator } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { InformesGestionService } from 'src/app/services/informes- gestion.service';
import { SesionTrabajoResponse } from 'src/app/dto/response/SesionTrabajo.response';
import { ComisionResponse } from 'src/app/dto/response/Comision.response';

@Component({
  selector: 'app-buscar-comision',
  templateUrl: './buscar-comision.component.html',
  styleUrls: ['./buscar-comision.component.scss']
})
export class BuscarComisionComponent implements OnInit {

  constructor(private fb: FormBuilder, private spinnerService: NgxSpinnerService,
              private dialogRef: MatDialogRef<BuscarComisionComponent>,
              @Inject(InformesGestionService) private informesGestionService: InformesGestionService) { }

  informesAnualesForm: FormGroup;
  listaComisiones: ComisionResponse[] = [];
  dataSource: MatTableDataSource<any> = null;

  displayedColumns: string[] = ['item', 'sesion', 'horaInicio', 'horaFin', 'fecha'];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  ngOnInit() {

    this.informesAnualesForm = this.fb.group({
      comision: ['', Validators.required],

    });

  }

  public cargarDatosTabla(): void {
    if (this.listaComisiones.length > 0) {
      this.dataSource = new MatTableDataSource(this.listaComisiones);
      this.dataSource.paginator = this.paginator;
    }
  }

  buscarComisiones() {
    // busquedaForm
    this.spinnerService.show();
    console.log('buscar comisiones');
    let formData = new FormData();
    formData.append('nombrecomision', this.informesAnualesForm.get('comision').value);

    this.informesGestionService.buscarComision(formData).subscribe(
      (data: ComisionResponse[]) => {
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

  seleccion(obj: ComisionResponse) {
    this.dialogRef.close(obj);
  }

  cancelar() {
    this.dialogRef.close(0);
  }

}
