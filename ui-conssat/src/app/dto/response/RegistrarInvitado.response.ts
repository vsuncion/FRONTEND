import { EntidadAcuerdoActaResponse } from './AcuerdoActaSesion.response';

export class RegistrarInvitadoResponse {
    iNvitadosidpk: number;
    sEsionfk: number;
    entidad: EntidadAcuerdoActaResponse;
    tipodocumento: TipoDocumentoResponse;
    vNumerodocumento: string;
    vNombre: string;
    vApellido_paterno: string;
    vApellido_materno: string;
    vNumerocelular: string;
    dFecregistro: Date;
    nUsureg: number;
    cFlgeliminado: string;
    aSistenciafk: number;
}

export class TipoDocumentoResponse {
    tPdocumentoidpk: number;
    vDesabreviado: string;
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