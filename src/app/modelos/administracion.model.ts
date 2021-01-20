export class ListarCertificadosModel {
  id: number;
  idTipoCertificado: number;
  tipoCertificado: string;
  serial: string;
  fechaVigencia: Date;
  cantidadFirmas: number;
  nit: string;
  razonSocialEmpresa: string;
  PIN1: string;
  PIN2: string;
  PIN3: string;
  PIN4: string;
  PINvalido: boolean = false;
  certificadoSeleccionado: boolean = false;
  certificadoConfigurado: boolean = false;
  sePuedeValidar: boolean = true;
}

export class TipoPersonaIdModel {
  TipoPersonaId: number;
  PersonaId: number;
  EmpresaId: number;
  EmpresaIdentificacion: number;
}

export class CertificadoInicialModel {
  idUsuario: number;
  pin: string;
  codigo: string;
  serial: string;
  nit: number;
  razonSocialEmpresa: string;
  identificacion: number;
  nombre: string;
  vigenciaCertificado: Date;
  idTipoCertificado: number;
}

export class CertificadoDigitalModel {
  empresaId: number;
  personaId: number;
  certificadoCodigo: string;
  certificadoSerial: string;
  certificadoPin: string;
  certificadoFechaVigencia: Date;
}


export class ListaCompaniasModel {
  uid: string;
  logo: string;
  firma: string;
  idUsuario: number;
  pin: string;
  serial: string;
  vigenciaCertificado: Date;
  nit: number;
  razonSocialEmpresa: string;
  identificacion: number;
  nombre: string;
  codigo: string;
  porDefecto: boolean = false;
  seleccionado: boolean = false;
  idtipoCertificado: number = 0;
}

export class Usuario {
  personaId: number;
  empresaId: number;
  personaPrimerNombre: string;
  personaSegundoNombre: string;
  personaPrimerApellido: string;
  personaSegundoApellido: string;
  personaIdentificacion: number;
  personaCorreo: string;
  personaCelular: number;
  personaHabilitado: boolean;
  empresaIdentificacion: number;
  tipoPersonaId: number;
}

export class DigitosModel {
  numeroDocumento: string;
  digito: string
}
