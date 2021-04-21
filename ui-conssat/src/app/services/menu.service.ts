import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  rolMenu = [
    {
      idRol: 'ROLE_ADMCONSSAT', menus: [
        { titulo: 'Seguridad', url: '/panel/seguridad', icono: 'fingerprint' },
        { titulo: 'Regiones', url: '/panel/regiones', icono: 'map' },
        
        { titulo: 'Correlativo Comisiones', url: '/panel/correlativoscomision', icono: 'supervisor_account' },
        { titulo: 'Correlativo Sesiones', url: '/panel/correlativos', icono: 'apps' },
        { titulo: 'Correlativo Sesiones Comision', url: '/panel/correlativosesion', icono: 'timeline' }
      ]
    },
    {
      idRol: 'ROLE_ADMCORSSAT', menus: [
        { titulo: 'Seguridad', url: '/panel/seguridad', icono: 'fingerprint' },
        { titulo: 'Regiones', url: '/panel/regiones', icono: 'map' },
        { titulo: 'Correlativo Comisiones', url: '/panel/correlativoscomision', icono: 'supervisor_account' },
        { titulo: 'Correlativo Sesiones', url: '/panel/correlativos', icono: 'apps' },
        { titulo: 'Correlativo Sesiones Comision', url: '/panel/correlativosesion', icono: 'timeline' }
        
      ]
    },
    {
      idRol: 'ROLE_CONSSAT', menus: [
        { titulo: 'consejeros', url: '/panel/consejeros', icono: 'accessibility' },
        { titulo: 'Plan de Trabajo', url: '/panel/planes-de-trabajo', icono: 'assignment_ind' },
        { titulo: 'Sesión de Trabajo', url: '/panel/sesiones-de-trabajo', icono: 'update' },
        { titulo: 'Seguimiento de Acuerdos', url: '/panel/seguimiento-de-acuerdos', icono: 'assignment_turned_in' },
        { titulo: 'Informes de Géstion', url: '/panel/informes-anuales', icono: 'find_in_page' },
        { titulo: 'Boletín', url: '/panel/boletines', icono: 'find_in_page' },
        { titulo: 'Calendario de Actividades', url: '/panel/calendarios', icono: 'find_in_page' }
      ]
    },
    {
      idRol: 'ROLE_CORSAT', menus: [
        { titulo: 'consejeros', url: '/panel/consejeros', icono: 'accessibility' },
        { titulo: 'Plan de Trabajo', url: '/panel/planes-de-trabajo', icono: 'assignment_ind' },
        { titulo: 'Sesión de Trabajo', url: '/panel/sesiones-de-trabajo', icono: 'update' },
        { titulo: 'Seguimiento de Acuerdos', url: '/panel/seguimiento-de-acuerdos', icono: 'assignment_turned_in' },
        { titulo: 'Informes de Géstion', url: '/panel/informes-anuales', icono: 'find_in_page' },
        { titulo: 'Boletín', url: '/panel/boletines', icono: 'find_in_page' },
        { titulo: 'Calendario de Actividades', url: '/panel/calendarios', icono: 'find_in_page' }
      ]
    },
    {
      idRol: 'ROLE_OPECONSSAT', menus: [
        { titulo: 'Miembros', url: '/panel/consejeros', icono: 'accessibility' },
        { titulo: 'Comisiones', url: '/panel/comisiones', icono: 'work' },
        { titulo: 'Plan de Trabajo', url: '/panel/planes-de-trabajo', icono: 'assignment_ind' },
        { titulo: 'Sesión de Trabajo', url: '/panel/sesiones-de-trabajo', icono: 'update' },
        { titulo: 'Seguimiento de Acuerdos', url: '/panel/seguimiento-de-acuerdos', icono: 'assignment_turned_in' },
        { titulo: 'Informes de Géstion', url: '/panel/informes-anuales', icono: 'find_in_page' },
        { titulo: 'Calendario de Actividades', url: '/panel/calendarios', icono: 'find_in_page' }
      ]
    },
    {
      idRol: 'ROLE_OPECORSSAT', menus: [
        { titulo: 'Miembros', url: '/panel/consejeros', icono: 'accessibility' },
        { titulo: 'Comisiones', url: '/panel/comisiones', icono: 'work' },
        { titulo: 'Plan de Trabajo', url: '/panel/planes-de-trabajo', icono: 'assignment_ind' },
        { titulo: 'Sesión de Trabajo', url: '/panel/sesiones-de-trabajo', icono: 'update' },
        { titulo: 'Seguimiento de Acuerdos', url: '/panel/seguimiento-de-acuerdos', icono: 'assignment_turned_in' },
        { titulo: 'Informes de Géstion', url: '/panel/informes-anuales', icono: 'find_in_page' },
        { titulo: 'Calendario de Actividades', url: '/panel/calendarios', icono: 'find_in_page' }
      ]
    }
  ];

  constructor() {
  }

  public obtenerMenuPorRol(idRolInput: string): Observable<any[]> {
    const filtrado = this.rolMenu.filter(el => el.idRol === idRolInput);
    if (filtrado.length > 0) {
      return of(filtrado[0].menus);
    } else {
      return of([]);
    }

  }
}
