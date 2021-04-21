import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SesionTrabajoResponse } from '../dto/response/SesionTrabajo.response';
import { backendUrl } from '../common';
import { AsistenciaSesionTrabajoResponse } from '../dto/response/AsistenciaSesionTrabajo.response';
import { TemaSesionTrabajoResponse } from '../dto/response/TemasSesionTrabajo.response';
import { ActaSesionTrabajoResponse } from '../dto/response/ActaSesionTrabajo.response';
import { AcuerdoActaSesionResponse, EntidadAcuerdoActaResponse } from '../dto/response/AcuerdoActaSesion.response';
import { ConsejeroResponse } from '../dto/response/Consejero.response';
import { RegistrarInvitadoResponse } from '../dto/response/RegistrarInvitado.response';
import { FirmantesResponse } from '../dto/response/Firmantes.response';
import { ActualizarInvitadoResponse } from '../dto/response/ActualizarInvitado.response';
import { AdjuntarArchivoResponse } from '../dto/response/AdjuntarArchivo.response';
import { Cookie } from 'ng2-cookies/ng2-cookies';


@Injectable({
  providedIn: 'root'
})
export class SesionTrabajoService {

  constructor(private http: HttpClient) { }

  public listarSesionTrabajo(): Observable<SesionTrabajoResponse[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.get<SesionTrabajoResponse[]>(`${backendUrl}api/sesion/`, httpOptions);
  }

  public registrarSesionTrabajo(formData: FormData): Observable<SesionTrabajoResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.post<SesionTrabajoResponse>(`${backendUrl}api/sesion/registrar`, formData, httpOptions);
  }

  public buscarSesionTrabajo(formData: FormData): Observable<SesionTrabajoResponse[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.post<SesionTrabajoResponse[]>(`${backendUrl}api/sesion/buscar`, formData, httpOptions);
  }

  public buscarSesionTrabajoPorId(id: number): Observable<SesionTrabajoResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.get<SesionTrabajoResponse>(`${backendUrl}api/sesion/${id}`, httpOptions);
  }

  public actualizarSesionTrabajo(req: FormData): Observable<SesionTrabajoResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.post<SesionTrabajoResponse>(`${backendUrl}api/sesion/actualizar`, req, httpOptions);
  }

  public eliminarSesionTrabajo(id: number): Observable<SesionTrabajoResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.delete<SesionTrabajoResponse>(`${backendUrl}api/sesion/${id}`, httpOptions);
  }



  // para Asistencia de sesion de trabajo

  // para la cabecera
  public buscarAsistenciaSesionTrabajoPorId(id: number): Observable<SesionTrabajoResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.get<SesionTrabajoResponse>(`${backendUrl}api/asistencia/${id}`, httpOptions);
  }

  public listarAsistenciaSesionTrabajo(id: number): Observable<AsistenciaSesionTrabajoResponse[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.get<AsistenciaSesionTrabajoResponse[]>(`${backendUrl}api/asistencia/listarasistentes/${id}`, httpOptions);
  }

  public registrarAsistente(formData: FormData): Observable<RegistrarInvitadoResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.post<RegistrarInvitadoResponse>(`${backendUrl}api/asistencia/registrarinvitado`, formData, httpOptions);
  }

  public actualizarAsistente(req: FormData): Observable<ActualizarInvitadoResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.post<ActualizarInvitadoResponse>(`${backendUrl}api/asistencia/actualizar`, req, httpOptions);
  }

  public adjuntarListaAsistencia(formData: FormData): Observable<AdjuntarArchivoResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.post<AdjuntarArchivoResponse>(`${backendUrl}api/asistencia/cargardocasistencia`, formData, httpOptions);
  }

  // para temas de sesion de trabajo

  public buscarTemaSesionTrabajoPorId(id: number): Observable<SesionTrabajoResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.get<SesionTrabajoResponse>(`${backendUrl}api/temas/${id}`, httpOptions);
  }

  public listarTemaSesionTrabajo(id: number): Observable<TemaSesionTrabajoResponse[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.get<TemaSesionTrabajoResponse[]>(`${backendUrl}api/temas/temasporsesion/${id}`, httpOptions);
  }

  public registrarTemaSesionTrabajo(formData: FormData): Observable<TemaSesionTrabajoResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.post<TemaSesionTrabajoResponse>(`${backendUrl}api/temas/registrar`, formData, httpOptions);
  }

  public eliminarTemaSesionTrabajo(id: number): Observable<TemaSesionTrabajoResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.delete<TemaSesionTrabajoResponse>(`${backendUrl}api/temas/${id}`, httpOptions);
  }

  // para actas de sesion de trabajo
  public buscarActaSesionTrabajoPorId(id: number): Observable<ActaSesionTrabajoResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.get<ActaSesionTrabajoResponse>(`${backendUrl}api/actas/actaporsesion/${id}`, httpOptions);
  }

  public registrarActaSesionTrabajo(formData: FormData): Observable<ActaSesionTrabajoResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.post<ActaSesionTrabajoResponse>(`${backendUrl}api/actas/registrar`, formData, httpOptions);
  }
  // para acuerdos de acta
  public registrarAcuedoActaSesionTrabajo(formData: FormData): Observable<AcuerdoActaSesionResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.post<AcuerdoActaSesionResponse>(`${backendUrl}api/actas/registraracuerdos`, formData, httpOptions);
  }

  public listarAcuerdoActaSesionTrabajo(id: number): Observable<AcuerdoActaSesionResponse[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.get<AcuerdoActaSesionResponse[]>(`${backendUrl}api/actas/listaracuerdosporacta/${id}`, httpOptions);
  }

  public eliminarAcuerdoActaSesionTrabajo(id: number): Observable<AcuerdoActaSesionResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.delete<AcuerdoActaSesionResponse>(`${backendUrl}api/acuerdos/${id}`, httpOptions);
  }

  public marcarAsistenciaActaSesionTrabajo(formData: FormData): Observable<FirmantesResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.post<FirmantesResponse>(`${backendUrl}api/actas/actualizarfirmante`, formData, httpOptions);
  }

  // para firmantes acta
  public listarFirmanteActaSesionTrabajo(id: number): Observable<FirmantesResponse[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.get<FirmantesResponse[]>(`${backendUrl}api/actas/listarfirmantesporacta/${id}`, httpOptions);
  }

  verificarDocAsistentes(idSesion: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.get<any>(`${backendUrl}api/asistencia/verificarasistencia/${idSesion}`, httpOptions);
  }

  decargarDocAsistentes(idSesion: number): Observable<HttpResponse<Blob>> {
    return this.http.get<Blob>(`${backendUrl}api/asistencia/descargar/${idSesion}`, {
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


  descargarDocTema1(id: number): Observable<HttpResponse<Blob>> {
    return this.http.get<Blob>(`${backendUrl}api/temas/archivo1_tema/${id}`, {
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

  descargarDocTema2(id: number): Observable<HttpResponse<Blob>> {
    return this.http.get<Blob>(`${backendUrl}api/temas/archivo2_tema/${id}`, {
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

  descargarDocTema3(id: number): Observable<HttpResponse<Blob>> {
    return this.http.get<Blob>(`${backendUrl}api/temas/archivo3_tema/${id}`, {
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




  descargarDocActa(id: number): Observable<HttpResponse<Blob>> {
    return this.http.get<Blob>(`${backendUrl}api/actas/descargar/${id}`, {
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
