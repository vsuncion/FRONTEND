export class BoletinResponse{

    bOletinidpk: number;
    vNumbol: string;
    dFecboletin: Date;
    vUbiarch: string;
    cFlgeliminado: string;
    dFecelimina: Date;
    nUsureg: number;
    dFecreg: Date;
    nUsumodifica: number;
    dFecmodifica: Date;
    dFechaInicio: Date;
    dFechaFin: Date;
    vNombrearchivo: string;
    vArchivoextension: string;
    region: RegionResponse;
    consejo: ConsejoResponse;
    nUsuelimina: number;
    vFecdesde: string;
    vFechasta: string;
    vComision: string;
}

export class RegionResponse{
    rEgionidpk: number;
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

export class ConsejoResponse{
    cOnsejoidpk: number;
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
