import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { backendUrl } from '../common';
import { EncargadoRegionResponse } from '../dto/response/EncargadoRegion.response';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EncargadoRegionService {
  constructor(private http: HttpClient) { }

  public listarRegion(): Observable<EncargadoRegionResponse[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.get<EncargadoRegionResponse[]>(`${backendUrl}api/encargadoregion/`, httpOptions);
  }

  public registrarRegion(formData: FormData): Observable<EncargadoRegionResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.post<EncargadoRegionResponse>(`${backendUrl}api/encargadoregion/registrar`, formData, httpOptions);
  }

  public buscarEncargadoRegion(formData: FormData): Observable<EncargadoRegionResponse[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.post<EncargadoRegionResponse[]>(`${backendUrl}api/encargadoregion/buscar`, formData, httpOptions);
  }

  public buscarEncargadoRegionPorId(id: number): Observable<EncargadoRegionResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.get<EncargadoRegionResponse>(`${backendUrl}api/encargadoregion/${id}`, httpOptions);
  }

  public actualizarEncargadoRegion(req: FormData): Observable<EncargadoRegionResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.post<EncargadoRegionResponse>(`${backendUrl}api/encargadoregion/actualizar`, req, httpOptions);
  }

  public eliminarEncargadoRegion(id: number): Observable<EncargadoRegionResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.delete<EncargadoRegionResponse>(`${backendUrl}api/encargadoregion/${id}`, httpOptions);
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


  descargarDocEncargadoRegion(id: number): Observable<HttpResponse<Blob>> {
    return this.http.get<Blob>(`${backendUrl}api/encargadoregion/descargar/${id}`, {
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
