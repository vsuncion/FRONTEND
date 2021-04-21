import { ComisionesResponse } from './Comisiones.response';
import { ConsejeroResponse, TipoConsejeroResponse } from './Consejero.response';

export class ComisionConsejoResponse{
    cOmiconsidpk: number;
    comision: ComisionesResponse;
    tipoconsejero: TipoConsejeroResponse; 
    cFlgeliminado: string;
    dFecelimina: Date;
    nUsureg: number;
    dFecreg: Date;
    nUsumodifica: number;
    dFecmodifica: Date;
    consejero: ConsejeroResponse; 
    dFecinicio: Date;
    dFecfin: Date;
    vNumdocumento: string;
    vUbicacion: string;
    vExtension: string;
    vNombrearchivo: string;
    tipoconsejeropk: number;
    comisionfk: number;
}