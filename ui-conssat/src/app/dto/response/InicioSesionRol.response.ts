import { InicioSesionResponse } from './InicioSesion.response'

export class InicioSesionRolResponse{

    uSuariorolidpk: number;
    usuario: InicioSesionResponse;
    roles: RolesResponse;
    dFecregistro: Date;
    cFlgelimino: string;
    dFecelimina: Date;
    nUsureg: number;
    dFecreg: Date;
    nUsumodifica: number;
    dFecmodifica: number;
    cFlgactivo: string;
}

export class RolesResponse{
    rOlidpk: number;
    vDesnombre: string;
    vDescripcion: string;
    dFecreacion: Date;
    cFlgactivo: string;
    cFlgeliminado: string;
    dFecelimina: Date;
    nUsureg: number;
    dFecreg: Date;
    nUsumodifica: number;
    dFecmodifica: Date;
}