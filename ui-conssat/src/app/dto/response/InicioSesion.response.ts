import { TipoDocumentoResponse } from './RegistrarInvitado.response';
import { RegionResponse } from './Boletin.response';

export class InicioSesionResponse{

    uSuarioidpk: number;
    tipodocumento: TipoDocumentoResponse;
    vNombre: string;
    vAppaterno: string;
    vApmaterno: string;
    vNumdocumento: string;
    username: string;
    password: string;
    cFlgeliminado: string;
    dFecelimina: Date;
    nUsureg: number;
    dFecreg: Date;
    nUsumodifica: number;
    dFecmodifica: Date;
    enabled: string;
    regiones: RegionResponse;
    vrol: string;
    vregion: string;
}
