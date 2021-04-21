import { SeguimientoAcuerdoResponse } from './SeguimientoAcuerdo.response';
import { EntidadAcuerdoActaResponse } from './AcuerdoActaSesion.response';

export class SeguimientoAcuerdoActaResponse {

    aCuerdoidpk: number;
    acta: SeguimientoAcuerdoResponse;
    entidad: EntidadAcuerdoActaResponse; 
    vDesacuerdo: string;
    dFecatencion: Date;
    dFecreacion: Date;
    cFlgeliminado: string;
    dFecelimina: Date;
    nUsureg: number;
    dFecreg: Date;
    nUsumodifica: number;
    dFecmodifica: Date;
    vResponsable: string;
    vCodigoSesion: string; 
    nTipoSesion:  number;
    vfechaInicio:  string;
    vfechafin: string;
}