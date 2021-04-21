import { backendUrl } from '../common';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccionesResponse } from '../dto/response/Acciones.response';
import { SeguimientoAcuerdoResponse } from '../dto/response/SeguimientoAcuerdo.response';
import { SeguimientoAcuerdoRequest } from '../dto/request/SeguimientoAcuerdo.request';
import { SeguimientoAcuerdoActaResponse } from '../dto/response/SeguimientoAcuerdoActa.response';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SeguimientoAcuerdoService {

  constructor(private http: HttpClient) { }

  // vista principal
  public listarSeguimientoAcuerdo(obj: any): Observable<SeguimientoAcuerdoResponse[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.post<SeguimientoAcuerdoResponse[]>(`${backendUrl}api/actas/listarActasPorSesion`, obj, httpOptions);
  }

  public buscarSeguimientoAcuerdo(req: SeguimientoAcuerdoRequest): Observable<SeguimientoAcuerdoResponse[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.post<SeguimientoAcuerdoResponse[]>(`${backendUrl}api/actas/buscartemasporsesion`, req, httpOptions);
  }

  // vista Seguimiento
  public listarSeguimientoAcuerdoAccion(id: number): Observable<SeguimientoAcuerdoActaResponse[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.get<SeguimientoAcuerdoActaResponse[]>(`${backendUrl}api/acuerdos/acuerdosporacta/${id}`, httpOptions);
  }

  public buscarSeguimientoPorId(id: number): Observable<SeguimientoAcuerdoResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.get<SeguimientoAcuerdoResponse>(`${backendUrl}api/actas/${id}`, httpOptions);
  }


  // vista accion
  public buscarSesionActaAcuerdoPorId(id: number): Observable<SeguimientoAcuerdoActaResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.get<SeguimientoAcuerdoActaResponse>(`${backendUrl}api/acuerdos/${id}`, httpOptions);
  }

  public listarAccionRealizada(id: number): Observable<AccionesResponse[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.get<AccionesResponse[]>(`${backendUrl}api/acciones/accionesporacuerdo/${id}`, httpOptions);
  }

  public registrarAccionRealizada(formData: FormData): Observable<AccionesResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.post<AccionesResponse>(`${backendUrl}api/acciones/registrar`, formData, httpOptions);
  }

  public buscarAccionPorId(idAccion: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.get<any>(`${backendUrl}api/acciones/${idAccion}`, httpOptions);
  }

  public actualizarAccionRealizada(formData: FormData): Observable<AccionesResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.post<AccionesResponse>(`${backendUrl}api/acciones/actualizar`, formData, httpOptions);
  }

  public eliminarAccionRealizada(id: number): Observable<AccionesResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.delete<AccionesResponse>(`${backendUrl}api/acciones/${id}`, httpOptions);
  }

  public descargarArchivo(data: Blob): void {
    const blob = new Blob([data], { type: 'application/pdf' });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.href = url;
    a.download = 'DESCARGA';
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }


  descargarDocAcuerdo(idAccionesidpk: number): Observable<HttpResponse<Blob>> {
    return this.http.get<Blob>(`${backendUrl}api/acciones/descargar/${idAccionesidpk}`, {
      observe: 'response',
      responseType: 'blob' as 'json',
      headers: new HttpHeaders({
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    });
  }
}
