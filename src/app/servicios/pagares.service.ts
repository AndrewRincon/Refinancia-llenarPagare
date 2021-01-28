import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Globals } from '../global/globals';
import { PagareDiligenciamientoSerialModel } from '../modelos/pagareDiligenciamiento.model';
import { PeticionPagare, PeticionPagareSerial } from '../modelos/peticionPagare.model';
import { AppTokenService } from '../core/services/token.service';
import * as Utils from 'src/app/utilidades/utils';
import { Router } from '@angular/router';
import { AppConfig } from '../global/app.config';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PagaresService {
    constructor(private httpClient: HttpClient,
      private router: Router,
      public readonly appTokenService: AppTokenService,
        public globals: Globals
    ) { }
    
    ValidarPagareDiligenciamiento(peticionPagare: PeticionPagare) {
    return this.httpClient.post(AppConfig.settings.endpoint.endpointAPIGateway + `Pagare/ValidarPagareDiligenciamiento/`, peticionPagare, httpOptions);
  }

  ValidarPagareDiligenciamientoSerial(peticionPagare: PeticionPagareSerial) {
    return this.httpClient.post(AppConfig.settings.endpoint.endpointAPIGateway + `Pagare/ValidarPagareDiligenciamientoSerial/`, peticionPagare, httpOptions);
  }

  DiligenciamientoSerial(peticionPagare: PagareDiligenciamientoSerialModel) {
    return this.httpClient.post(AppConfig.settings.endpoint.endpointAPIGateway +`Pagare/FirmarPagareDiligenciamientoSerial/`, peticionPagare, httpOptions);
  }
  
  returnPortalComercio(estado: number, mensaje: string){
    window.location.href = AppConfig.settings.endpoint.endpointPortalComercio + 'main/previewpagare/' + this.getParametrosRetornar(estado,mensaje);
  }

  getParametrosRetornar(estado: number, mensaje: string){
    return Utils.encryptStringUrl(sessionStorage.getItem("pagareSerial"), AppConfig.settings.params.SECRET_KEY) + "/"
    + Utils.encryptStringUrl(sessionStorage.getItem("documento"), AppConfig.settings.params.SECRET_KEY) + "/"
    + Utils.encryptStringUrl(sessionStorage.getItem("empresaActualId"), AppConfig.settings.params.SECRET_KEY) + "/"
    + Utils.encryptStringUrl(sessionStorage.getItem("loginToken"), AppConfig.settings.params.SECRET_KEY) + "/"
    + Utils.encryptStringUrl(sessionStorage.getItem("tipoDocumento"), AppConfig.settings.params.SECRET_KEY) + "/"
    + Utils.encryptStringUrl(estado.toString(), AppConfig.settings.params.SECRET_KEY) + "/"
    + Utils.encryptStringUrl(mensaje, AppConfig.settings.params.SECRET_KEY);
    
  }

}
