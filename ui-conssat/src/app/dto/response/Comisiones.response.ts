import { RegionResponse, ConsejoResponse } from './Boletin.response';
import { ConsejeroResponse } from './Consejero.response';

export class ComisionesResponse {
    cOmisionidpk: number;
    tipocomision: TipoComisionResponse;
    vCodcomision: string;
    vNumdocapr: string;
    vUbidocap: string;
    dFecdocapr: Date;
    dFecinicio: Date;
    dFecfin: Date;
    cFlgeliminado: string;
    dFecelimina: Date;
    nUsureg: number;
    dFecreg: Date;
    nUsumodifica: number;
    dFecmodifica: Date;
    region: RegionResponse;
    consejo: ConsejoResponse;
    nUsuelimina: number;
    consejero: ConsejeroResponse;
    vArchivoextension: string;
    vNombreArchivo: string;
    nombrencargado: string;
    vDescripcion: string;
}

export class TipoComisionResponse {
    tIpocomsidpk: number;
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
