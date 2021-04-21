import { ConsejoResponse, RegionResponse } from './Boletin.response';
import { TipoSesionesResponse } from './SesionTrabajo.response';

export class SeguimientoAcuerdoResponse {

    aCtaidpk: number;
    sesionfk: SesionResponse;
    vCodacta: string;
    dFecacta: Date;
    vUbiarch: string;
    cFlagelimina: string;
    dFecelimina: Date;
    nUsureg: number;
    dFecreg: Date;
    nUsumodifica: number;
    dFecmodifica: Date;
    vNombrearchivo: string;
    vArchivoextension: string;
    vCodigoSesion: string;
    nTipoSesion: number;
    vfechaInicio: string;
    vfechafin: string;
    nregion: number;

}

export class SesionResponse {

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
    consejofk: ConsejoResponse;
    dFechaInicio: Date;
    dFechaFin: Date;
    tipoSesiones: TipoSesionesResponse;
    region: RegionResponse;
    nUsuelimina: number;
    

}