export class Correlativosesionresponse {
  correlativoSesion : number;
  region: RegionResponse;
  comision: ComisionResponse
  valorInicial: number;
  tipoSesion:  tipoSesionResponse;
  fechaRegistro: Date;
 }

 export class RegionResponse{
  rEgionidpk : number;
  vDesnombre : string;
  vDescripcion : string;
 }

 export class ComisionResponse{
  cOmisionidpk: number;
  tipocomision: tipocomisionResponse;
  vCodcomision: string;
  vNumdocapr: string;
 }

 export class tipocomisionResponse{
  tIpocomsidpk: number;
  vDesnombre: string;
  vDescripcion: string; 
 }

 export class tipoSesionResponse{
  tIposesionidpk: number;
  vDesnombre: string;
  vDescripcion: string; 
 }
