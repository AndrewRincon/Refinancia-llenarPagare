import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ListarCertificadosModel, CertificadoInicialModel, Usuario, ListaCompaniasModel, CertificadoDigitalModel, DigitosModel } from '../modelos/administracion.model';
import { DefinicionFiltroModel } from '../modelos/definicionfiltro.model';
import { Globals } from '../global/globals';
import { AppConfig } from '../global/app.config';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AdministracionService {

  constructor(private httpClient: HttpClient,
    public globals: Globals) { }

  obtenerPersonaRol(identificacion: string, empresaId: number) {
    let res = this.httpClient.get(AppConfig.settings.endpoint.endpointAPIGateway + `Administracion/ObtenerPersonaRol/${identificacion}/${empresaId}`);
    return res;
  }
}
