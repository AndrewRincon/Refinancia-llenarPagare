import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { LoginRequest, SessionTokenModel } from "../modelos/login.model";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  constructor(private httpClient: HttpClient) { }

  VerificarExistenciaUsuario(idTipo: string, id: string) {
    return this.httpClient.get(`Seguridad/VerificarExistenciaUsuario/${id}/${idTipo}`);
  }

  login(numeroDocumento: string, TextoOTP: string) {
    let login: LoginRequest = new LoginRequest();
    login.documentoIdentificacion = +numeroDocumento;
    login.textoOTP = TextoOTP;
    return this.httpClient.post(`Seguridad/login`, login, httpOptions);
  }

  ValidarSession(session: SessionTokenModel) {
    return this.httpClient.post(`Seguridad/ValidarSession`, session, httpOptions);
  }
}
