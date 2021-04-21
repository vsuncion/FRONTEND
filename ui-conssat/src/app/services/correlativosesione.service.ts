import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { backendUrl } from '../common';
import { Correlativosesionresponse} from '../dto/response/correlativosesion.response'
import { Injectable } from '@angular/core';
import { BuscarCorrelativoSesionRequest } from '../dto/request/buscarCorrelativoSsesion.request';

@Injectable({
  providedIn: 'root'
})
export class CorrelativosesioneService {

  constructor(private http: HttpClient) { }

  public listarCorrelativos(): Observable<Correlativosesionresponse[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.get<Correlativosesionresponse[]>(`${backendUrl}api/correlativos/listarsesiones`, httpOptions);
  }

 
  public buscarCorrelativoSesion(formData: FormData): Observable<Correlativosesionresponse[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.post<Correlativosesionresponse[]>(`${backendUrl}api/correlativos/buscarsesiones`, formData, httpOptions);
  }

  public registrarCorrelativo(formData: FormData): Observable<Correlativosesionresponse>{
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.post<Correlativosesionresponse>(`${backendUrl}api/correlativos/registrarsesiones`, formData, httpOptions);
  }


   public buscarCorrelativoPorId(id: number): Observable<Correlativosesionresponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.get<Correlativosesionresponse>(`${backendUrl}api/correlativos/buscarsesionid/${id}`, httpOptions);
  }


  public actualizarCorrelativo(req: FormData): Observable<Correlativosesionresponse>{
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.post<Correlativosesionresponse>(`${backendUrl}api/correlativos/actualizarsesiones`, req, httpOptions);
  }


}
