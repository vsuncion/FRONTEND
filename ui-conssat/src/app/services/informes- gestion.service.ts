import { InformeAnualResponse } from '../dto/response/InformeAnual.response';
import { Observable } from 'rxjs';
import { backendUrl } from '../common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SesionTrabajoResponse } from '../dto/response/SesionTrabajo.response';
import { ComisionResponse } from '../dto/response/Comision.response';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InformesGestionService {

  constructor(private http: HttpClient) { }

  public listarInformeAnual(): Observable<InformeAnualResponse[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.get<InformeAnualResponse[]>(`${backendUrl}api/informes/`, httpOptions);
  }

  public buscarInformeAnual(formData: FormData): Observable<InformeAnualResponse[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.post<InformeAnualResponse[]>(`${backendUrl}api/informes/buscar`, formData, httpOptions);
  }

  public registrarInformeAnual(formData: FormData): Observable<InformeAnualResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.post<InformeAnualResponse>(`${backendUrl}api/informes/registrar`, formData, httpOptions);
  }

  public eliminarInformeAnual(id: number): Observable<InformeAnualResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.delete<InformeAnualResponse>(`${backendUrl}api/informes/${id}`, httpOptions);
  }

  public buscarSesion(formData: FormData): Observable<SesionTrabajoResponse[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.post<SesionTrabajoResponse[]>(`${backendUrl}api/sesion/buscarpornombre`, formData, httpOptions);
  }

  public buscarComision(formData: FormData): Observable<ComisionResponse[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.post<ComisionResponse[]>(`${backendUrl}api/comisiones/buscarpornombre`, formData, httpOptions);
  }

  public buscarInformeAnualPorId(id: number): Observable<InformeAnualResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.get<InformeAnualResponse>(`${backendUrl}api/informes/${id}`, httpOptions);
  }

  public actualizarInformeAnual(req: FormData): Observable<InformeAnualResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.post<InformeAnualResponse>(`${backendUrl}api/informes/actualizar`, req, httpOptions);
  }
}
