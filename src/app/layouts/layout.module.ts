import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AppLayoutMainComponent } from "./layout-main/layout-main.component";
import { AppNavComponent } from "./nav/nav.component";
import { LoaderComponent } from './loader/loader.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from '../core/interceptors/loader.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppConfigurationLayoutComponent } from './ConfigurationLayout/configurationlayout.component';
import { AdminPlantillasComponent } from '../vistas/main/admin-plantillas/admin-plantillas.component';
import { CrearPlantillaComponent } from '../vistas/main/crear-plantilla/crear-plantilla.component';
import { PreviewPlantillaComponent } from '../vistas/main/preview-plantilla/preview-plantilla.component';
import { MatSelectModule } from '@angular/material';
import { AppLayoutMainPlantillaComponent } from './layout-main-plantilla/layout-main-plantilla.component';
import { AppNavPlantillaComponent } from './nav-plantilla/nav-plantilla.component';
import { DemoComponent } from "../vistas/demo/demo.component";


@NgModule({
  declarations: [
    AppLayoutMainComponent,
    AppLayoutMainPlantillaComponent,
    AppNavComponent,
    AppNavPlantillaComponent,
    LoaderComponent,
    AppConfigurationLayoutComponent,
    AdminPlantillasComponent,
    CrearPlantillaComponent,
    PreviewPlantillaComponent,
    DemoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatSelectModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(), 
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    }
  ],
})

export class AppLayoutsModule { }

