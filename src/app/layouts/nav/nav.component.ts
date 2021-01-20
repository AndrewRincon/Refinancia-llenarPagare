import { Component, OnInit } from '@angular/core';
import { Router, Event } from '@angular/router';
import { Globals } from '../../global/globals';
import { EmpresasLogin, SessionTokenModel } from '../../modelos/login.model';
import { SeguridadService } from '../../servicios/seguridad.service';
import { CertificadoDigitalModel } from '../../modelos/administracion.model';
import { AdministracionService } from '../../servicios/administracion.service';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { PagaresService } from "../../servicios/pagares.service"
import { DefinicionFiltroModel } from '../../modelos/definicionfiltro.model';
import { PersonaModel } from '../../modelos/persona.model';
import { TipoPersonaEnum } from '../../enumeradores/ModuloAdministracion/RolPersonaEnum';
@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    providers: [DatePipe]
})
export class AppNavComponent implements OnInit {
    //globals.empresas: EmpresasLogin[];
    menuHabilitado: boolean = false;
    menuResponsive: boolean = false;
    menuRL: boolean = false;
    verPerfil: boolean = false;
    desplegarSubmenuConfig: boolean = false;
    validaSessionToken: SessionTokenModel = new SessionTokenModel();
    ddlEmpresaSelectedValue: string = "";
    myDate = new Date();
    Persona: PersonaModel = new PersonaModel();
    definicionFiltro: DefinicionFiltroModel = new DefinicionFiltroModel();
    identificacion: string;
    RolPersona: String;

    constructor(
        public globals: Globals,
        private router: Router,
        private _seguridadService: SeguridadService,
        private _administracionService: AdministracionService,
        private datePipe: DatePipe,
        private toastr: ToastrService,
        private pagareService: PagaresService    ) {
    }


    ngOnInit() {

    //     let loginToken: string = sessionStorage.getItem("loginToken");
    //     this.validaSessionToken.sessionToken = loginToken;
    //     if (!sessionStorage.getItem("documento")) {
    //         this.CerrarSesion();
    //     }
    //     let identificacion = +sessionStorage.getItem("documento");

       

    //     this.validaSessionToken.identificacion = identificacion.toString();
    //     this._seguridadService.ValidarSession(this.validaSessionToken).subscribe((Respuesta: boolean) => {
    //         if (!Respuesta) {
    //             this.CerrarSesion();
    //         }
    //     });

    //   this.globals.empresas = JSON.parse(sessionStorage.getItem("empresas"));
    //   for (var i = 0; i < length; i++) {
    //     if (identificacion == this.globals.empresas[i].empresaIdentificacion) {

    //     }
    //   }
     
    //     //this.globals.empresas = this.globals.empresas;

        
    
    //     if (this.globals.empresas.length > 0) {
    //         if (sessionStorage.getItem("empresaActual")) {
    //             this.globals.empresaActual = JSON.parse(sessionStorage.getItem("empresaActual"));
    //         }
    //         else {
    //             this.globals.empresaActual = this.globals.empresas[0];

    //             sessionStorage.setItem("empresaActual", JSON.stringify(this.globals.empresaActual));
    //         }
            
    //       this._administracionService.obtenerPersonaRol(sessionStorage.getItem("documento"), this.globals.empresaActual.id).subscribe((Respuesta: PersonaModel) => {
          
    //             if (Respuesta) {
    //                 this.Persona = Respuesta;
    //                 if (this.Persona.TipoPersonaId == TipoPersonaEnum.RepresentanteLegal)
    //                     this.RolPersona = "Representante Legal";
    //                 if (this.Persona.TipoPersonaId == TipoPersonaEnum.Ayudante)
    //                     this.RolPersona = "Ayudante";
    //             }
    //         });

    //       this._administracionService.ValidarCertificado(identificacion, this.globals.empresaActual.id).subscribe((ResCert: CertificadoDigitalModel) => {
          
    //             let today = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    //           let dateCert = this.datePipe.transform(ResCert.certificadoFechaVigencia, 'yyyy-MM-dd');
        
    //             var fechaInicio = new Date(dateCert).getTime();
    //             var fechaFin = new Date(today).getTime();
    //             var diff = fechaInicio - fechaFin;
    //             let dias = diff / (1000 * 60 * 60 * 24)
    //             if (dias <= 5) {
    //                 if (dias < 0) {
    //                     this.toastr.info('Su certificado ya venció para: ' + this.globals.empresaActual.empresaRazonSocial + ', por favor renuevelo.');
    //                 }
    //                 else
    //                     this.toastr.info('Recuerde que su certificado vence en ' + dias + '.');
    //             }

    //         });

    //       this.menuHabilitado = this.globals.empresaActual.certificadoActivo;
    //       if (this.globals.empresaActual.tipoPersona == 2) {
    //         this.menuHabilitado = this.globals.empresaActual.certificadoActivo;
          
    //       }
    //         this.globals.navRazonSocialActual = this.globals.empresaActual.empresaRazonSocial;
    //         this.globals.navEmpresaIdentificacion = this.globals.empresaActual.empresaIdentificacion;
    //         this.globals.logoActivo = this.globals.empresaActual.empresaLogo;
    //         this.ddlEmpresaSelectedValue = this.globals.empresaActual.id.toString();

    //         this.CargueinicialCantidad();

    //         if (this.globals.empresaActual.tipoPersona == 1) {
                this.menuRL = true;
    //         }
    //         else {
    //             this.menuRL = false;
    //         }

    //         if (!this.menuHabilitado) {
    //             this.router.navigateByUrl("main/certificado");
    //         }
    //     }
    //     else {
    //         this.globals.navRazonSocialActual = "";
    //         this.globals.navEmpresaIdentificacion = 0;
    //         this.menuHabilitado = false;
    //     }
    }

    CargueinicialCantidad() {
        
        this.obtenerCantidadPagares();
    }

    obtenerCantidadPagares() {
        this.pagareService.obtenerCantidadPagares(this.globals.empresaActual.id);
    }

  ResponsiveMenuClick() {
    this.menuResponsive = !this.menuResponsive;
    }
 

  CambioCompania(compania: string) {
    let urlActual = this.router.url;
    let companiaSeleccionada: EmpresasLogin[] = this.globals.empresas.filter(function (f) { return f.id == +compania });

        this.globals.empresaActual = companiaSeleccionada[0];
        this.globals.navRazonSocialActual = this.globals.empresaActual.empresaRazonSocial;
        this.globals.navEmpresaIdentificacion = this.globals.empresaActual.empresaIdentificacion;
        this.globals.logoActivo = this.globals.empresaActual.empresaLogo;
        sessionStorage.setItem("empresaActual", JSON.stringify(companiaSeleccionada[0]));
        if (this.globals.empresaActual.certificadoActivo && this.globals.empresaActual.vigenciaCertificado) {
            this.router.navigateByUrl(urlActual);
            this.menuHabilitado = true;
            if (this.globals.empresaActual.tipoPersona == 1) {
                this.menuRL = true;
            }
            else {
                this.menuRL = false;
            }
        }
        else {
            this.router.navigateByUrl("main/certificado");
            this.menuHabilitado = false;
        }

        this.obtenerCantidadPagares();

    }

    SubmenuConfiguracion() {
        this.desplegarSubmenuConfig = !this.desplegarSubmenuConfig;
    }

    Configuracion(route: string) {
        sessionStorage.setItem("EsConfiguracionInicial", "0");
        this.router.navigateByUrl(route);
    }

    CerrarSesion() {
        sessionStorage.clear();
        localStorage.clear();
        this.globals.logoActivo = "";
        this.globals.navRazonSocialActual = "";
        this.globals.empresaActual = null;
        this.router.navigateByUrl("");
    }
}
