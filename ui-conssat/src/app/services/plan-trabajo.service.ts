import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlanTrabajoResponse } from '../dto/response/PlanTrabajo.response';
import { backendUrl } from '../common';
import { PlanTrabajoRequest } from '../dto/request/PlanTrabajo.request';
import { BuscarPlanTrabajoRequest } from '../dto/request/BuscarPlanTrabajo.request';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class PlanTrabajoService {

  constructor(private http: HttpClient) { }

  public listarPlanTrabajo(): Observable<PlanTrabajoResponse[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.get<PlanTrabajoResponse[]>(`${backendUrl}api/plantrabajo/`, httpOptions);
  }

  public registrarPlanTrabajo(formData: FormData): Observable<PlanTrabajoResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.post<PlanTrabajoResponse>(`${backendUrl}api/plantrabajo/registrar`, formData, httpOptions);
  }

  public buscarPlanTrabajoPorId(id: number): Observable<PlanTrabajoResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.get<PlanTrabajoResponse>(`${backendUrl}api/plantrabajo/${id}`, httpOptions);
  }

  public buscarPlanTrabajo(obj: BuscarPlanTrabajoRequest): Observable<PlanTrabajoResponse[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.post<PlanTrabajoResponse[]>(`${backendUrl}api/plantrabajo/buscar`, obj, httpOptions);
  }

  public actualizarPlanTrabajo(formData: FormData): Observable<PlanTrabajoResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.post<PlanTrabajoResponse>(`${backendUrl}api/plantrabajo/actualizar`, formData, httpOptions);
  }

  public eliminarPlanTrabajo(id: number): Observable<PlanTrabajoResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.delete<PlanTrabajoResponse>(`${backendUrl}api/plantrabajo/${id}`, httpOptions);
  }

  public decargarDocAprobacion(id: number): Observable<HttpResponse<Blob>> {
    return this.http.get<Blob>(`${backendUrl}api/plantrabajo/descargaraprobacion/${id}`, {
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

}
