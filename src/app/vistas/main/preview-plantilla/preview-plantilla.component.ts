import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/core/services/loader.service';
import { AppTokenService } from 'src/app/core/services/token.service';
import { LlenadoPagareEstados } from 'src/app/enumeradores/ModuloPagares/LlenadoPagareEnum';
import { AppConfig } from 'src/app/global/app.config';
import { Globals } from 'src/app/global/globals';
import { EmpresasLogin } from 'src/app/modelos/login.model';
import { RespuestaBaseHttp } from 'src/app/modelos/respuestabase.model';
import { FiledataService } from 'src/app/servicios/filedata.service';
import { PagaresService } from 'src/app/servicios/pagares.service';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
import * as Utils from 'src/app/utilidades/utils';

@Component({
  selector: 'app-previewplantilla',
  templateUrl: './preview-plantilla.component.html',
})
export class PreviewPlantillaComponent implements OnInit{
  constructor(
    private router: Router,
    private loaderService: LoaderService,
    private globals: Globals,
    private pagareService: PagaresService,
    private seguridadService: SeguridadService,
    private fdService: FiledataService,
    private toastr: ToastrService,
    public tokenService: AppTokenService,
    public activatedRoute: ActivatedRoute
  ) {
  }
  
  ngOnInit() {
    this.loaderService.startLoading();
    //get data
    this.activatedRoute.paramMap.subscribe(params => {
      sessionStorage.setItem("pagareSerial", Utils.desencryptStringUrl(params.get('pagareSerial'), AppConfig.settings.params.SECRET_KEY));
      sessionStorage.setItem("documento", Utils.desencryptStringUrl(params.get('documento'), AppConfig.settings.params.SECRET_KEY));
      sessionStorage.setItem("empresaActualId", Utils.desencryptStringUrl(params.get('empresaActualId'), AppConfig.settings.params.SECRET_KEY));
      sessionStorage.setItem("empresaActualNombre", Utils.desencryptStringUrl(params.get('empresaActualNombre'), AppConfig.settings.params.SECRET_KEY));
      sessionStorage.setItem("loginToken", Utils.desencryptStringUrl(params.get('loginToken'), AppConfig.settings.params.SECRET_KEY));
      sessionStorage.setItem("tipoDocumento", Utils.desencryptStringUrl(params.get('tipoDocumento'), AppConfig.settings.params.SECRET_KEY));
    });

    this.globals.empresaActual = new EmpresasLogin();
    this.globals.empresaActual.empresaRazonSocial = sessionStorage.getItem("empresaActualNombre");
    this.globals.empresaActual.id = parseInt(sessionStorage.getItem("empresaActualId"));

    //getToken
    this.getToken();
  }

  getToken(){
    this.seguridadService.LoginToken().subscribe((Respuesta: any) => {
      if(Respuesta.accessToken != null){
        this.tokenService.set(Respuesta.accessToken);
        this.consultarPagare();
      }
    }, (error: any) => {
      this.toastr.error("No fue posible validar el token, inténtelo más tarde");
    });
  }

  consultarPagare() {
    if (sessionStorage.getItem("pagareSerial")) {
      this.pagareService.ValidarPagareDiligenciamientoSerial({ SerialPagare: sessionStorage.getItem("pagareSerial")}).subscribe((Respuesta: RespuestaBaseHttp) => {
        if (Respuesta.codigoHttp == 200) {
          this.fdService.addPagareSerial(sessionStorage.getItem("pagareSerial"));
          this.fdService.addFiles(Respuesta);
          //this.fdService.addFileName(Respuesta.mensaje);
          this.router.navigateByUrl('main/plantilla');
        }else if(Respuesta.codigoHttp == 401){
          this.getToken();
        } else {
          if (Respuesta.mensaje != null) {
            this.pagareService.returnPortalComercio(LlenadoPagareEstados.Cancelado, Respuesta.mensaje);
          } else {
            this.pagareService.returnPortalComercio(LlenadoPagareEstados.Cancelado, "No fue posible validar el procesoCliente Externo, inténtelo más tarde");
          }
        }
      }, (error: any) => {
        if(error.status == 401)
          this.getToken();
        else
          this.toastr.error("No fue posible validar el procesoCliente Externo, inténtelo más tarde");
      });
    } else {
      this.toastr.error("por favor ingrese el procesoCliente Externo");
    }
  }
}
