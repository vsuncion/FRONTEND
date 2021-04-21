export class TemaSesionTrabajoResponse {

    tEmaidpk: number;
    sEsionfk: number;
    vDescripcion: string;
    vUbiarch1: string;
    vUbiarch2: string;
    vUbiarch3: string;
    dFecreacion: Date;
    cFlgeliminado: string;
    dFecelimina: Date;
    nUsureg: number;
    dFecreg: Date;
    nUsumodifica: number;
    dFecmodifica: Date;
    vNombrearchivo1: string;
    vUbiarchivo1: string;
    vExtarchivo1: string;
    vNombrearchivo2: string;
    vUbiarchivo2: string;
    vExtarchivo2: string;
    vNombrearchivo3: string;
    vUbiarchivo3: string;
    vExtarchivo3: string;
    tIpotemafk: TipoTemas;
}

export class TipoTemas{
    tIpotemaidpk: number;
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
