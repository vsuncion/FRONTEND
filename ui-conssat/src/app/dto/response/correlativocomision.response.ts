export class correlativocomisionresponse {
  correlativoComision : number;
  region: RegionResponse; 
  valorInicial: number;
  tipoComisiones:  tipocomisionResponse;
  fechaRegistro: Date;
 }

 export class RegionResponse{
  rEgionidpk : number;
  vDesnombre : string;
  vDescripcion : string;
 }


 export class tipocomisionResponse{
  tIpocomsidpk: number;
  vDesnombre: string;
  vDescripcion: string; 
 }

 