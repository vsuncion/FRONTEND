import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from '../../services/menu.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  listaMenu: any[]=[];

  constructor(private router: Router,
    @Inject(MenuService) private menuService: MenuService,) {
  }

  ngOnInit() {
    this.cargarMenu();
  }

  cerrar_sesion() {
    Cookie.delete('access_token_fc');
    Cookie.delete('inforegioncodigo');
    Cookie.delete('idusuario');
    Cookie.delete('idrol');
    Cookie.delete('vnombreusuario');
    Cookie.delete('vnombreregion');
    this.router.navigate(['/login']);
  }

  cargarMenu() {
    let idRol = Cookie.get('idrol');
    this.menuService.obtenerMenuPorRol(idRol).subscribe(
      (data: any[]) => {
        console.log(data);
        this.listaMenu = data;
      }, error => {
        console.log(error);
      }
    );
  }
}
