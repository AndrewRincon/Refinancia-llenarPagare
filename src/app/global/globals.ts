import { Injectable } from '@angular/core';
import { EmpresasLogin } from '../modelos/login.model'

@Injectable()
export class Globals {
  empresas: EmpresasLogin[];
  cantidadEmpresas: number = 0;
  cantidadPagares: number = 0;
  cantidadPagaresInicial: string = "";
  cantidadEndososInicial: string = '';
  cantidadRecepcionPagares: string = '';
  cantidadProcesoPagares: string = '';
  cantidadCanceladosPagares: string = '';
  navRazonSocialActual: string = "";
  navEmpresaIdentificacion: number = 0;
  empresaActual: EmpresasLogin;
  logoActivo: string = "";
  SECRET_KEY: string = "0l1mp14";
}
