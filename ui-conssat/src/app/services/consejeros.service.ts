import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { backendUrl } from '../common';
import { ConsejeroResponse } from '../dto/response/Consejero.response';
import { BuscarConsejeroRequest } from '../dto/request/BuscarCosejero.request';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class ConsejerosService {

  constructor(private http: HttpClient) { }

  public listarConsejeros(): Observable<ConsejeroResponse[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.get<ConsejeroResponse[]>(`${backendUrl}api/consejeros/`, httpOptions);
  }

  public buscarConsejeros(req: BuscarConsejeroRequest): Observable<ConsejeroResponse[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.post<ConsejeroResponse[]>(`${backendUrl}api/consejeros/buscar`, req, httpOptions);
  }

  public registrarConsejeros(formData: FormData): Observable<ConsejeroResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.post<ConsejeroResponse>(`${backendUrl}api/consejeros/registrar`, formData, httpOptions);
  }

  public buscarConsejeroPorId(id: number): Observable<ConsejeroResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.get<ConsejeroResponse>(`${backendUrl}api/consejeros/${id}`, httpOptions);
  }

  public actualizarConsejeros(formData: FormData): Observable<ConsejeroResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.post<ConsejeroResponse>(`${backendUrl}api/consejeros/actualizar`, formData, httpOptions);
  }

  public eliminarConsejeros(id: number): Observable<ConsejeroResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.delete<ConsejeroResponse>(`${backendUrl}api/consejeros/${id}`, httpOptions);
  }
}
