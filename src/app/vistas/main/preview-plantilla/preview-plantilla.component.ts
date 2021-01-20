import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from 'src/app/core/services/loader.service';
import { Globals } from 'src/app/global/globals';
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
    public activatedRoute: ActivatedRoute,
  ) {
  }
  
  ngOnInit() {
        var empresa = unescape(this.activatedRoute.snapshot.paramMap.get('empresa'));
        sessionStorage.setItem("empresa", Utils.desencryptString(empresa, this.globals.SECRET_KEY))
        localStorage.setItem("empresa", Utils.desencryptString(empresa, this.globals.SECRET_KEY))
        this.router.navigate(["main/plantilla"]);
  }
}
