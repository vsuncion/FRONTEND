import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { backendUrl } from '../common';
import { ComisionesResponse } from '../dto/response/Comisiones.response';
import { ConsejeroResponse } from '../dto/response/Consejero.response';
import { BuscarComisionRequest } from '../dto/request/BuscarComision.request';
import { ComisionConsejoResponse } from '../dto/response/ComisionConsejo.response';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComisionesService {
  constructor(private http: HttpClient) { }

  public listarComisiones(): Observable<ComisionesResponse[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.get<ComisionesResponse[]>(`${backendUrl}api/comisiones/`, httpOptions);
  }

  public registrarComisiones(formData: FormData): Observable<ComisionesResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.post<ComisionesResponse>(`${backendUrl}api/comisiones/registrar`, formData, httpOptions);
  }

  public listarEncargados(): Observable<ConsejeroResponse[]> {
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

  public buscarComisionPorId(id: number): Observable<ComisionesResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.get<ComisionesResponse>(`${backendUrl}api/comisiones/${id}`, httpOptions);
  }

  public actualizarComision(req: FormData): Observable<ComisionesResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.post<ComisionesResponse>(`${backendUrl}api/comisiones/actualizar`, req, httpOptions);
  }

  public eliminarComision(id: number): Observable<ComisionesResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.delete<ComisionesResponse>(`${backendUrl}api/comisiones/${id}`, httpOptions);
  }

  public buscarComision(req: BuscarComisionRequest): Observable<ComisionesResponse[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.post<ComisionesResponse[]>(`${backendUrl}api/comisiones/buscar`, req, httpOptions);
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


  descargarDocAcuerdo(id: number): Observable<HttpResponse<Blob>> {
    return this.http.get<Blob>(`${backendUrl}api/comisiones/descargar/${id}`, {
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

  // INTEGRANTES

  public listarIntegrantesComision(id: number): Observable<ComisionConsejoResponse[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.get<ComisionConsejoResponse[]>(`${backendUrl}api/comisiconsej/consejeroscomision/${id}`, httpOptions);
  }

  public buscarIntegrantePorId(id: number): Observable<ComisionConsejoResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.get<ComisionConsejoResponse>(`${backendUrl}api/comisiconsej/${id}`, httpOptions);
  }

  public actualizarIntegrantesComision(req: FormData): Observable<ComisionConsejoResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.post<ComisionConsejoResponse>(`${backendUrl}api/comisiconsej/actualizar`, req, httpOptions);
  }

  descargarDocIntegrante(idIntegrante: number): Observable<HttpResponse<Blob>> {
    return this.http.get<Blob>(`${backendUrl}api/comisiconsej/descargar/${idIntegrante}`, {
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

  public eliminarIntegrante(id: number): Observable<ComisionConsejoResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.delete<ComisionConsejoResponse>(`${backendUrl}api/comisiconsej/${id}`, httpOptions);
  }
}
