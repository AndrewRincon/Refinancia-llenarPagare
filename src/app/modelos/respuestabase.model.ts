export class RespuestaBase {
    public operacionExitosa: boolean = false;
    public mensaje: string;
    public gUIDMesaAyuda?: string;
}

export class RespuestaBaseHttp {
  public codigoHttp: number;
  public codigo: string;
  public mensaje?: string;
}
