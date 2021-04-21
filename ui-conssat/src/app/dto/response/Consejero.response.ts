import { RegionResponse, ConsejoResponse } from './Boletin.response';
import { TipoDocumentoResponse } from './RegistrarInvitado.response';
import { EntidadAcuerdoActaResponse } from './AcuerdoActaSesion.response';

export class ConsejeroResponse {

    // cOnsejeroidpk: number;
    // rEgionfk: number;
    // cOnsejofk: number;
    // cOmisionfk: number;
    // vTipdocumento: string;
    // vNumdocumento: string;
    // vDesnombre: string;
    // vDesappaterno: string;
    // vDesapmaterno: string;
    // vProfesion: string;
    // vDesemail1: string;
    // vDesemail2: string;
    // vEntidad: string;
    // vTpconsejero: string;
    // dFecinicio: Date;
    // dFecfin: Date;
    // vNumdocasig: string;
    // vNombredocasig: string;
    // vUbidocasig: string;
    // vExtdocasig: string;
    // cFlgeliminado: string;
    // dFecelimina: Date;
    // nUsueliminia: string;
    // nUsureg: string;
    // dFecreg: Date;
    // nUsumodifica: string;
    // dFecmodifica: Date;





    cOnsejeroidpk: number;
    region: RegionResponse;
    consejo: ConsejoResponse;
    tipoconsejero: TipoConsejeroResponse;
    tipodocumento: TipoDocumentoResponse; 
    profesion: ProfesionResponse;   
    entidad: EntidadAcuerdoActaResponse;
    vNumdocumento: string;
    vDesnombre: string;
    vDesappaterno: string;
    vDesapmaterno: string;
    vDesemail1: string;
    vDesemail2: string;
    dFecinicio: Date;
    dFecfin: Date;
    vNumdocasig: string;
    vNombredocasig: string;
    vUbidocasig: string;
    vExtdocasig: string;
    cFlgeliminado: string;
    dFecelimina: Date;
    nUsueliminia: number;
    nUsureg: number;
    dFecreg: Date;
    nUsumodifica: number;
    dFecmodifica: Date;
    vnombreComision: string;
    vEntidad: string;
    rEgionfk: number;
    cOnsejofk: number;
}

export class TipoConsejeroResponse{
    tPconsejeroidpk: number;
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

export class ProfesionResponse{
    pRofesionidpk: number;
    vDesnombre: string;
    vDescripcion:  string;
    dFecregistro: Date;
    cFlgactivo: string;
    cFlgeliminado: string;
    dFecelimina: Date;
    nUsureg: number;
    dFecreg: Date;
    nUsumodifica: number;
    dFecmodifica: Date;
}