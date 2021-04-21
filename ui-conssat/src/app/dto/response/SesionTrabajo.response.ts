export class SesionTrabajoResponse {

    sEsionidpk: number;    
    comisionfk: number;
    vCodsesion: string;
    dHorinicio: Date;
    dHorfin: Date;
    dFecreacion: Date;
    cFlgeliminado: string;
    dFecelimina: Date;
    nUsureg: number;
    dFecreg: Date;
    nUsumodifica: number;
    dFecmodifica: Date;
    dFechaInicio: Date;
    dFechaFin: Date;
    tipoSesiones: TipoSesionesResponse;
}

export class TipoSesionesResponse{
    tIposesionidpk: number;
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