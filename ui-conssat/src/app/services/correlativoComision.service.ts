import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { correlativocomisionresponse } from '../dto/response/correlativocomision.response';
import { backendUrl } from '../common';
import { Observable } from 'rxjs';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class CorrelativoComisionService {

  constructor(private http: HttpClient) { }

  public listarCorrelativos(): Observable<correlativocomisionresponse[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.get<correlativocomisionresponse[]>(`${backendUrl}api/correlativos/listarcomisiones`, httpOptions);
  }

  public registrarCorrelativo(formData: FormData): Observable<correlativocomisionresponse>{
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.post<correlativocomisionresponse>(`${backendUrl}api/correlativos/registrarcomisiones`, formData, httpOptions);
  }


  public buscarCorrelativoPorId(id: number): Observable<correlativocomisionresponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.get<correlativocomisionresponse>(`${backendUrl}api/correlativos/buscarcomisionid/${id}`, httpOptions);
  }


  public actualizarCorrelativo(req: FormData): Observable<correlativocomisionresponse>{
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };

    return this.http.post<correlativocomisionresponse>(`${backendUrl}api/correlativos/actualizarcomisiones`, req, httpOptions);

  }


}
