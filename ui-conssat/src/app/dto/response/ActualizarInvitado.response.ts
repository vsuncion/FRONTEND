import { ConsejeroResponse } from './Consejero.response';

export class ActualizarInvitadoResponse{
    aSistenciaidpk: number;
    vHoentrada: string;
    sEsionfk: number;
    vHosalida: string;
    cFlgasistio: string;
    cFlgeliminado: string;
    dFecelimina: Date;
    nUsureg: number;
    dFecreg: Date;
    nUsumodifica: number;
    dFecmodifica: Date;
    consejero: ConsejeroResponse;
    iNvitadosfk: number;

}