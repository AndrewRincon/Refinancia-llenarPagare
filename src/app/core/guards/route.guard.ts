import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AppTokenService } from "../services/token.service";
import * as Utils from 'src/app/utilidades/utils';
import { Globals } from "src/app/global/globals";
import { AppConfig } from "src/app/global/app.config";

@Injectable({ providedIn: "root" })
export class AppRouteGuard implements CanActivate {
    constructor(
        private readonly router: Router,
        private readonly appTokenService: AppTokenService,
        public activatedRoute: ActivatedRoute,
        public globals: Globals) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log(route);
        console.log(state);
        var empresa = this.activatedRoute.snapshot.paramMap.get('empresa');
        sessionStorage.setItem("empresa", Utils.desencryptString(empresa, AppConfig.settings.params.SECRET_KEY))
        this.router.navigate(["plantilla"]);
        return false;
    }
}
