import { Observable } from 'rxjs';
import { backendUrl } from '../common';
import { CalendarioActividadResponse } from '../dto/response/CalendarioActividad.response';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegistrarCalendarioRequest } from '../dto/request/RegistrarCalendario.request';
import { BuscarCalendarioRequest } from '../dto/request/BuscarCalendario.Request';
import { CalendarioActividadBuscarResponse } from '../dto/response/CalendarioActividadBuscar.response';
import { ActualizarCalendarioRequest } from '../dto/request/ActualizarCalendario.request';
import { CalendarioAntividadActualizarResponse } from '../dto/response/CalendarioActividadActualizar.response';
import { RegistrarParticipanteCalendarioRequest } from '../dto/request/RegistrarParticCalendario.request';
import { CalendarioParticipanteResponse } from '../dto/response/CalendadrioParticipante.response';
import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class CalendarioActividadesService {

  constructor(private http: HttpClient) { }

  public listarCalendarioActividad(): Observable<CalendarioActividadResponse[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.get<CalendarioActividadResponse[]>(`${backendUrl}api/calendario/`, httpOptions);
  }

  public registrarCalendarioActividad(req: RegistrarCalendarioRequest): Observable<CalendarioActividadResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.post<CalendarioActividadResponse>(`${backendUrl}api/calendario/registrar`, req, httpOptions);
  }

  public buscarCalendarioActPorId(id: number): Observable<CalendarioActividadResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.get<CalendarioActividadResponse>(`${backendUrl}api/calendario/${id}`, httpOptions);
  }

  public buscarCalendario(req: BuscarCalendarioRequest): Observable<CalendarioActividadBuscarResponse[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.post<CalendarioActividadBuscarResponse[]>(`${backendUrl}api/calendario/buscar`, req, httpOptions);
  }

  public actualizarCalendario(req: ActualizarCalendarioRequest): Observable<CalendarioAntividadActualizarResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.post<CalendarioAntividadActualizarResponse>(`${backendUrl}api/calendario/actualizar`, req, httpOptions);
  }

  public eliminarCalendario(id: number): Observable<CalendarioActividadBuscarResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.delete<CalendarioActividadBuscarResponse>(`${backendUrl}api/calendario/${id}`, httpOptions);
  }

  // Participante
  public registrarParticipantesCalendario(req: RegistrarParticipanteCalendarioRequest): Observable<CalendarioParticipanteResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.post<CalendarioParticipanteResponse>(`${backendUrl}api/particicalendario/registrar`, req, httpOptions);
  }

  public listarParticipantesCalendario(id: number): Observable<CalendarioParticipanteResponse[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.get<CalendarioParticipanteResponse[]>(`${backendUrl}api/particicalendario/listaparticipantes/${id}`, httpOptions);
  }

  public eliminarParticipanteCalendario(id: number): Observable<CalendarioParticipanteResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.delete<CalendarioParticipanteResponse>(`${backendUrl}api/particicalendario/${id}`, httpOptions);
  }

}
