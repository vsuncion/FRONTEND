import { SeleccionResponse } from './../dto/response/seleccion.response';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoDocumentoResponse } from '../dto/response/RegistrarInvitado.response';
import { backendUrl } from '../common';
import { EntidadAcuerdoActaResponse } from '../dto/response/AcuerdoActaSesion.response';
import { TemaSesionTrabajoResponse, TipoTemas } from '../dto/response/TemasSesionTrabajo.response';
import { TipoSesionesResponse } from '../dto/response/SesionTrabajo.response';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ProfesionResponse } from '../dto/response/Consejero.response';
import { RegionResponse } from '../dto/response/Boletin.response';
import { RolesResponse } from '../dto/response/InicioSesionRol.response';

@Injectable({
  providedIn: 'root'
})
export class FijasService {

  constructor(private http: HttpClient) { }

  public listarTipoDocumento(): Observable<TipoDocumentoResponse[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.get<TipoDocumentoResponse[]>(`${backendUrl}api/fijas/listartipodocumentos`, httpOptions);
  }

  public listarEntidades(): Observable<EntidadAcuerdoActaResponse[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    console.log('estees el http hiders');
    console.log(httpOptions);
    return this.http.get<EntidadAcuerdoActaResponse[]>(`${backendUrl}api/fijas/listarentidades`, httpOptions);
  }

  public listarTipoTemas(): Observable<TipoTemas[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.get<TipoTemas[]>(`${backendUrl}api/fijas/listartemas`, httpOptions);
  }

  public listarTipoSesion(): Observable<TipoSesionesResponse[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.get<TipoSesionesResponse[]>(`${backendUrl}api/fijas/listartiposesion`, httpOptions);
  }

  public listarProfesiones(): Observable<ProfesionResponse[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    console.log('estees el http hiders');
    console.log(httpOptions);
    return this.http.get<ProfesionResponse[]>(`${backendUrl}api/fijas/listarprofesiones`, httpOptions);
  }

  public listarRegiones(): Observable<RegionResponse[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    console.log('estees el http hiders');
    console.log(httpOptions);
    return this.http.get<RegionResponse[]>(`${backendUrl}api/fijas/listaregiones`, httpOptions);
  }

  public listarTipoRol(): Observable<RolesResponse[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.get<RolesResponse[]>(`${backendUrl}api/fijas/listaroles`, httpOptions);
  }


  public listarConsejo(id: number): Observable<SeleccionResponse[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.get<SeleccionResponse[]>(`${backendUrl}api/fijas/listarconsejo/${id}`, httpOptions);
  }


  /*
  public listarModulo(id: number): Observable<SeleccionResponse[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.get<SeleccionResponse[]>(`${backendUrl}api/fijas/listarmodulo/${id}`, httpOptions);
  }
*/


  public listarTipoModulo(): Observable<SeleccionResponse[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.get<SeleccionResponse[]>(`${backendUrl}api/fijas/listartipomodulo/`, httpOptions);
  }



  public listarTipoComision(): Observable<SeleccionResponse[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + Cookie.get('access_token_fc'),
        id_usuario: Cookie.get('idusuario'),
        info_regioncodigo: Cookie.get('inforegioncodigo'),
        info_rol: Cookie.get('idrol')
      })
    };
    return this.http.get<SeleccionResponse[]>(`${backendUrl}api/fijas/listartipocomisiones/`, httpOptions);
  }


}
