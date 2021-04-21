import { CalendarioActividadBuscarResponse } from './CalendarioActividadBuscar.response';
import { EntidadAcuerdoActaResponse } from './AcuerdoActaSesion.response';
import { TipoDocumentoResponse } from './RegistrarInvitado.response';

export class CalendarioParticipanteResponse{

    pArtcalendidpk: number;
    calendario: CalendarioActividadBuscarResponse;       
    vNombre: string;
    vApellidoPaterno: string;
    vApellidoMaterno: string;
    tipodocumento: TipoDocumentoResponse; 
    vNumerodocumento: string;
    entidad: EntidadAcuerdoActaResponse;        
    vCorreo: string;
    dFecactividad: Date;
    cFlgeliminado: string;
    nUsuregistra: number;
    dFecregistro: Date;
    nUsuariomodifica: number;
    dFecmodifica: Date;
    nUsuarioelimina: number;
    dFecElimina: Date;
    comision: string;
    cFlgeparticipo: string;
    nCalendiariofk: number;
    nTipodocumento: number;
    nEntidad: number;
    vFechaActividad: string;
}