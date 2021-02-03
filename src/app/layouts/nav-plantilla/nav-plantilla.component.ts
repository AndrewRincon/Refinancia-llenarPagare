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
import * as Utils from 'src/app/utilidades/utils';
import { LlenadoPagareEstados } from 'src/app/enumeradores/ModuloPagares/LlenadoPagareEnum';

@Component({
  selector: 'app-nav-plantilla',
  templateUrl: './nav-plantilla.component.html',
    providers: [DatePipe]
})
export class AppNavPlantillaComponent implements OnInit {
    menuHabilitado: boolean = false;
    menuRL: boolean = false;
    verPerfil: boolean = false;
    validaSessionToken: SessionTokenModel = new SessionTokenModel();
    ddlEmpresaSelectedValue: string = "";
    myDate = new Date();
    Persona: PersonaModel = new PersonaModel();
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
        let loginToken: string = sessionStorage.getItem("loginToken");
        this.validaSessionToken.sessionToken = loginToken;
        if (!sessionStorage.getItem("documento")) {
            this.CerrarSesion();
        }
        
        this.validaSessionToken.identificacion = sessionStorage.getItem("documento");
        this._seguridadService.ValidarSession(this.validaSessionToken).subscribe((Respuesta: boolean) => {
            if (!Respuesta) {
                this.CerrarSesion();
            }
        });
        
        if(this.globals.empresaActual == null){
            this.globals.empresaActual = new EmpresasLogin();
            this.globals.empresaActual.empresaRazonSocial = sessionStorage.getItem("empresaActualNombre");
            this.globals.empresaActual.id = parseInt(sessionStorage.getItem("empresaActualId"));
        } 

        this._administracionService.obtenerPersonaRol(sessionStorage.getItem("documento"), this.globals.empresaActual.id).subscribe((Respuesta: PersonaModel) => {
          
            if (Respuesta) {
                this.Persona = Respuesta;
                if (this.Persona.TipoPersonaId == TipoPersonaEnum.RepresentanteLegal)
                    this.RolPersona = "Representante Legal";
                if (this.Persona.TipoPersonaId == TipoPersonaEnum.Ayudante)
                    this.RolPersona = "Ayudante";
            }
        });
        
        this.menuRL = false;
        this.menuHabilitado = false;
    }

    returnMain(){
        this.pagareService.returnPortalComercio(LlenadoPagareEstados.Cancelado, "Se ha cancelado la modificación del pagaré");
    }

    CerrarSesion() {
        this.globals.logoActivo = "";
        this.globals.navRazonSocialActual = "";
        this.globals.empresaActual = null;
        this.pagareService.returnPortalComercio(LlenadoPagareEstados.CerrarSesion, "Se ha cerrado la sesion");
    }
}
