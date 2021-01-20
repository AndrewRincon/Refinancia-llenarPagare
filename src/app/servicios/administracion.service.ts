import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ListarCertificadosModel, CertificadoInicialModel, Usuario, ListaCompaniasModel, CertificadoDigitalModel, DigitosModel } from '../modelos/administracion.model';
import { DefinicionFiltroModel } from '../modelos/definicionfiltro.model';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AdministracionService {

  constructor(private httpClient: HttpClient) { }

  Empresas() {
    return this.httpClient.get(`Administracion/Empresa/`);
  }

  obtenerEmpresas(definicionFiltro: DefinicionFiltroModel) {
    return this.httpClient.post(`Administracion/ObtenerEmpresas/`, { definicionFiltro: definicionFiltro }, httpOptions);
  }

  Certificados(tipoIdentificacion: number, cedula: number) {
    return this.httpClient.get(`Administracion/Certificados/${tipoIdentificacion}/${cedula}`);
  }

  CertificadosEmpresaAyudante(identificacion: number, empresaId: number) {
    return this.httpClient.get(`Administracion/Certificados/EmpresaAyudante/${identificacion}/${empresaId}`);
  }

  CertificadosEmpresa(nit: number) {
    return this.httpClient.get(`Administracion/Certificados/Empresa/${nit}`);
  }
  

  GuardarCertificados(CertificadoInicialLista: ListaCompaniasModel[]) {
    return this.httpClient.post(`Administracion/GuardarCertificadosConfiguracion/`, CertificadoInicialLista, httpOptions);
  }

  GuardarEmpresaAutonoma(EmpresaAutonoma: ListaCompaniasModel) {
    return this.httpClient.post(`Administracion/GuardarEmpresaAutonoma/`, EmpresaAutonoma, httpOptions);
  }

  CambiarEmpresaxdefectoAsync(CertificadoInicialLista: ListaCompaniasModel) {
    return this.httpClient.post(`Administracion/CambiarEmpresaxdefectoAsync/`, CertificadoInicialLista, httpOptions);
  }

  GuardarCertificadosAyudantes(CertificadoAyudantes: CertificadoDigitalModel) {
    return this.httpClient.post(`Administracion/GuardarCertificadosAyudantes/`, CertificadoAyudantes, httpOptions);
  }
  ValidarPin(CertificadoInicial: CertificadoInicialModel) {
    return this.httpClient.post(`Administracion/ValidarPin/`, CertificadoInicial, httpOptions);
  }
  GuardarAyudante(ayudante: Usuario) {
    return this.httpClient.post(`Administracion/GuardarAyudante/`, ayudante, httpOptions);
  }
  EditarUsuario(ayudante: Usuario) {
    return this.httpClient.post(`Administracion/EditarUsuario/`, ayudante, httpOptions);
  }
  ObtenerUsuario(identificacion: number) {
    return this.httpClient.get(`Administracion/ObtenerAyudante/${identificacion}`);
  }
  ObtenerAyudantes(nit: number) {
    return this.httpClient.get(`Administracion/ObtenerAyudantes/${nit}`);
  }
  RemoverAyudante(ayudante: Usuario) {
    return this.httpClient.put(`Administracion/RemoverAyudante/`, ayudante, httpOptions);
  }
  ValidarCertificado(identificacion: number, empresaId: number) {
    return this.httpClient.get(`Administracion/CertificadoDigital/ValidarCertificado/${identificacion}/${empresaId}`);
  }

  CambiarEstadoEmpresa(codigo: string, Nit: number, Estado: boolean) {
    let res = this.httpClient.post(`Administracion/CambiarEstadoEmpresa/`, { Codigo: codigo, Nit: Nit, Estado: Estado }, httpOptions);
    return res;
  }

  obtenerPersonaRol(identificacion: string, empresaId: number) {
    let res = this.httpClient.get(`Administracion/ObtenerPersonaRol/${identificacion}/${empresaId}`);
    return res;
  }

  CalcularDigito(numeroDocumentoLista: DigitosModel[]) {
    let res = this.httpClient.post('Administracion/CalcularDigito/', numeroDocumentoLista, httpOptions);
    return res;
  }


}
