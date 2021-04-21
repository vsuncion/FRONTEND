import { Component, OnInit, Inject } from '@angular/core';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  title = 'Plataforma Virtual del Consejo Nacional de Seguridad y Salud en el Trabajo';
  usuariologeado = Cookie.get('vnombreusuario');
  nombreregion = Cookie.get('vnombreregion');
  nombrerol = Cookie.get('idrol');
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  saliendo() {
    Cookie.delete('access_token_fc');
    Cookie.delete('inforegioncodigo');
    Cookie.delete('idusuario');
    Cookie.delete('idrol');
    Cookie.delete('vnombreusuario');
    Cookie.delete('vnombreregion');
    this.router.navigate(['/login']);
  }
}
