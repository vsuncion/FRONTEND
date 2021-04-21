import { HttpClient, HttpHeaders } from '@angular/common/http';
import { backendUrl } from '../common';
import { Observable } from 'rxjs';
import { BoletinResponse } from '../dto/response/Boletin.response';
import { BoletinEntidadEliminarResponse } from '../dto/response/BoletinEntidadEliminar.response';
import { BuscarBoletinRequest } from '../dto/request/BuscarBoletines.request';
import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class BoletinesService {

  constructor(private http: HttpClient) { }

  public registrarBoletin(formData: FormData): Observable<BoletinResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.post<BoletinResponse>(`${backendUrl}api/boletines/registrar`, formData, httpOptions);
  }

  public listarBoletin(): Observable<BoletinResponse[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.get<BoletinResponse[]>(`${backendUrl}api/boletines/`, httpOptions);
  }

  public buscarBoletin(req: BuscarBoletinRequest): Observable<BoletinResponse[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.post<BoletinResponse[]>(`${backendUrl}api/boletines/buscar`, req, httpOptions);
  }

  public buscarBoletinPorId(id: number): Observable<BoletinEntidadEliminarResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.get<BoletinEntidadEliminarResponse>(`${backendUrl}api/boletines/${id}`, httpOptions);
  }

  public eliminarBoletin(id: number): Observable<BoletinEntidadEliminarResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.delete<BoletinEntidadEliminarResponse>(`${backendUrl}api/boletines/${id}`, httpOptions);
  }

  public decargarBoletinId(id: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.get<any>(`${backendUrl}api/boletines/descargar/${id}`, httpOptions);
  }

  public actualizarBoletin(req: FormData): Observable<BoletinResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.post<BoletinResponse>(`${backendUrl}api/boletines/actualizar`, req, httpOptions);
  }
}
