export interface IAppConfig {
  endpoint: {
    endpointAPIGateway: string;
    endpointPortalComercio: string;
  }
  params: {
    usuarioApi: string;
    claveApi: string;
    SECRET_KEY: string;
  }
}