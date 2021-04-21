import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { backendUrl } from '../common';
import { CorrelativoResponse }  from '../dto/response/Correlativo.response';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CorrelativosService {

  constructor(private http: HttpClient) { }

  public listarCorrelativos(): Observable<CorrelativoResponse[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.get<CorrelativoResponse[]>(`${backendUrl}api/correlativos/listar`, httpOptions);
  }


  public buscarCorrelativoPorId(id: number): Observable<CorrelativoResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.get<CorrelativoResponse>(`${backendUrl}api/correlativos/${id}`, httpOptions);
  }


  public actualizarCorrelativo(req: FormData): Observable<CorrelativoResponse>{
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.post<CorrelativoResponse>(`${backendUrl}api/correlativos/actualizar`, req, httpOptions);
  }

  public registrarCorrelativo(formData: FormData): Observable<CorrelativoResponse>{
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.post<CorrelativoResponse>(`${backendUrl}api/correlativos/registrar`, formData, httpOptions);
  }



}
