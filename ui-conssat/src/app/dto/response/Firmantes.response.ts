import { ActaSesionTrabajoResponse } from './ActaSesionTrabajo.response'

export class FirmantesResponse {
    fIrmanteidpk: number;
    actas: ActaSesionTrabajoResponse;
    vEntidad: string;
    vTipodocumento: string;
    vNumerodocumento: string;
    vNombre: string;
    vTipo: string;
    cFlgasistio: string;
    cFlgelimino: string;
    nFsureg: string;
    dFecreg: Date;
    nUsumodifica: string;
    dFecmodifica: Date;
    dFecelimina: Date;

}