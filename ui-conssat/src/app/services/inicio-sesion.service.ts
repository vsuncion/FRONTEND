import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { backendUrl } from '../common';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { InicioSesionResponse } from '../dto/response/InicioSesion.response';
import { InicioSesionRolResponse } from '../dto/response/InicioSesionRol.response';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InicioSesionService {
  constructor(private http: HttpClient) { }

  public buscarUsuarioInicSesion(formData: FormData): Observable<InicioSesionResponse[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.post<InicioSesionResponse[]>(`${backendUrl}api/seguridad/buscar`, formData, httpOptions);
  }

  public listarUsuarioInicSesion(): Observable<InicioSesionResponse[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.get<InicioSesionResponse[]>(`${backendUrl}api/seguridad/`, httpOptions);
  }

  public registrarUsuarioInicSesion(formData: FormData): Observable<InicioSesionResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.post<InicioSesionResponse>(`${backendUrl}api/seguridad/registrar`, formData, httpOptions);
  }

  public buscarUsuarioInicSesionPorId(id: number): Observable<InicioSesionResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.get<InicioSesionResponse>(`${backendUrl}api/seguridad/${id}`, httpOptions);
  }

  public actualizarUsuarioInicSesion(req: FormData): Observable<InicioSesionResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.post<InicioSesionResponse>(`${backendUrl}api/seguridad/actualizar`, req, httpOptions);
  }

  public eliminarUsuarioInicSesion(id: number): Observable<InicioSesionResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.delete<InicioSesionResponse>(`${backendUrl}api/seguridad/eliminar/${id}`, httpOptions);
  }

  // Rol

  public listarInicSesionRol(id: number): Observable<InicioSesionRolResponse[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.get<InicioSesionRolResponse[]>(`${backendUrl}api/roles/${id}`, httpOptions);
  }

  public registrarInicSesionRol(formData: FormData): Observable<InicioSesionRolResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.post<InicioSesionRolResponse>(`${backendUrl}api/roles/registrar`, formData, httpOptions);
  }

  public habilitarRol(id: number): Observable<InicioSesionRolResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.get<InicioSesionRolResponse>(`${backendUrl}api/roles/activar/${id}`, httpOptions);
  }

  public desabilitarRol(id: number): Observable<InicioSesionRolResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.get<InicioSesionRolResponse>(`${backendUrl}api/roles/desactivar/${id}`, httpOptions);
  }
}
