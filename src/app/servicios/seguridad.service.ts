import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { LoginRequest, SessionTokenModel } from "../modelos/login.model";
import { Globals } from '../global/globals';
import { TokenRequest } from '../modelos/tokenRequest.model';
import { AppConfig } from '../global/app.config';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {
  constructor(private httpClient: HttpClient, 
    public globals: Globals) { }

  ValidarSession(session: SessionTokenModel) {
    return this.httpClient.post(AppConfig.settings.endpoint.endpointAPIGateway + `Seguridad/ValidarSession`, session, httpOptions);
  }

  LoginToken() {
    let requestModel :TokenRequest = {User: AppConfig.settings.params.usuarioApi, Password: AppConfig.settings.params.claveApi};
    return this.httpClient.post(AppConfig.settings.endpoint.endpointAPIGateway + `Seguridad/Token/Login`, requestModel, httpOptions);
  }
}
