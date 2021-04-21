import { EntidadAcuerdoActaResponse } from './AcuerdoActaSesion.response';
import { TipoDocumentoResponse } from './RegistrarInvitado.response';
import { RegionResponse } from './Boletin.response';

export class EncargadoRegionResponse{
    eNcargadoregionidpk: number;
    region: RegionResponse;        
    entidades: EntidadAcuerdoActaResponse; 
    tipoDocumentos: TipoDocumentoResponse;
    vNumdocaprobacion: string;
    vNumdocumento: string;
    vNombre: string;
    vApellidopaterno: string;
    vApellidomaterno: string;
    vNumerocelular: string;
    dFechaprobacion: Date;
    vNombreArchivo: string;
    vUbicacionarchivo: string;
    vExtension: string;
    cFlgeliminado: string;
    dFecregistro: Date;
    nUsuarioregistra: number;
    dFechamodifica: Date;
    nUsuariomodifica: number;
    dFechaelimina: Date;
    nUsuarioelimina: number;
    regionpk: number;
    consejeropk: number;
    
}