import { RegionResponse, ConsejoResponse } from './Boletin.response';

export class CalendarioActividadResponse {
    
    cAlendarioidpk: number;
    cOmisionfk: string;
    vDesactividad: string;
    dFecactividad: Date;
    vHorainicio: string;
    vHorafin: string;
    cFlgejecuto: string;
    dFecejecuto: Date;
    vDesejecucion: string;
    cFlgeliminado: string;
    dFecelimina:  Date;
    nUsureg: number;
    dFecreg: Date;
    nUsumodifica: number;
    dFecmodifica: Date;
    vFechaActividad: string;
    region: RegionResponse;
    consejo: ConsejoResponse;
    nUsuelimina: number;
}