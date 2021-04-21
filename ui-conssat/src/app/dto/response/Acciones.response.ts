import { EntidadAcuerdoActaResponse } from './AcuerdoActaSesion.response';
import { SeguimientoAcuerdoActaResponse } from './SeguimientoAcuerdoActa.response';

export class AccionesResponse {

    aCcionesidpk: number;
    acuerdo: SeguimientoAcuerdoActaResponse;
    entidad: EntidadAcuerdoActaResponse;        
    vResponsable: string;
    vDesaccion: string;
    dFecejecutara: Date;
    cFlgejecuto: string;
    dFecejecuto: Date;
    vNombrearchivo: string;
    vUbiarch: string;
    vExtarchivo: string;
    dFecreacion: Date;
    cFlgeliminado: string;
    dFecelimina: Date;
    nUsureg: number;
    dFecreg: Date;
    nUsumodifica: number;
    dFecmodifica: Date;


}