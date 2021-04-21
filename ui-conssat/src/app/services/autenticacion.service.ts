import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../dto/request/Usuario';
import { Observable } from 'rxjs';
import { AutenticacionResponse } from '../dto/response/Autenticacion.response';
import { clientId, clientSecret, backendUrl } from 'src/app/common';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AutenticacionService {

    constructor(private http: HttpClient, private router: Router) { }

    getAccessToken(user: Usuario): Observable<AutenticacionResponse> {
        const params = new URLSearchParams();
        params.append('username', user.username);
        params.append('password', user.password);
        params.append('grant_type', 'password');

        const headers = new HttpHeaders({
            'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
            Authorization: 'Basic ' + btoa(clientId + ':' + clientSecret)
        });

        return this.http.post<AutenticacionResponse>(`${backendUrl}oauth/token`, params.toString(), { headers });
    }

    saveToken(token: AutenticacionResponse) {
        const expireDate = new Date().getTime() + (1000 * token.expires_in);
        Cookie.set('access_token_fc', token.access_token, expireDate);
        Cookie.set('inforegioncodigo', token.inforegioncodigo, expireDate);
        Cookie.set('idusuario', token.id_usuario, expireDate);
        Cookie.set('idrol', token.nombre_rol, expireDate);
        Cookie.set('vnombreusuario', token.infonombre, expireDate);
        Cookie.set('vnombreregion', token.inforegion, expireDate);
    }

    existeToken(): void {
        const token = Cookie.get('access_token_fc');
        console.log('esto es el token');
        console.log(token);

        if (token == null || typeof (token) === 'undefined') {
            console.log('por aqui paso');
            this.router.navigate(['/login']);
        }

    }

    salir() {
        Cookie.delete('access_token_fc');
        Cookie.delete('inforegioncodigo');
        Cookie.delete('idusuario');
        Cookie.delete('idrol');
        Cookie.delete('vnombreusuario');
        Cookie.delete('vnombreregion');
        this.router.navigate(['/login']);
    }

}
