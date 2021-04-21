import { ActaSesionTrabajoResponse } from './ActaSesionTrabajo.response';

export class AcuerdoActaSesionResponse {

    aCuerdoidpk: number;
    acta: ActaSesionTrabajoResponse;     
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
}
    
export class EntidadAcuerdoActaResponse{
    eNtidadidpk: number;
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