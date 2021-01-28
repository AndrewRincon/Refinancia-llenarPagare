import { Injectable } from '@angular/core';
import { EmpresasLogin } from '../modelos/login.model'
import { PersonaModel } from '../modelos/persona.model';

@Injectable()
export class Globals {
  empresas: EmpresasLogin[];
  Persona: PersonaModel;
  pagareserial: string = '';
  loginToken: string = '';
  tipoDocumento: string = '';
  RolPersona: string = '';
  empresaActual: EmpresasLogin;
  navRazonSocialActual: string = "";
  navEmpresaIdentificacion: number = 0;
  logoActivo: string = "";
  // usuarioApi: string = "reconoser";
  // claveApi: string = "Olimpia12345.";
  // endpointAPIGateway: string = 'https://localhost:44362/';
  // endpointPortalComercio: string = 'https://localhost:44320/';
  // SECRET_KEY: string = "0l1mp14";
}
