import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { NgxFileDropModule } from 'ngx-file-drop';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SubirPlantillaComponent } from './vistas/modales/subir-plantilla/subir-plantilla.component';
import { AppLayoutsModule } from './layouts/layout.module';
import { Globals } from './global/globals';
import { AppRouteGuard } from './core/guards/route.guard';
import { AppConfig } from './global/app.config';

export function initializeApp(appConfig: AppConfig) {
  return () => appConfig.load();
}

@NgModule({
  declarations: [
    AppComponent,
    SubirPlantillaComponent
  ],
  imports: [
    BrowserModule,
    AppLayoutsModule,
    AppRoutingModule,
    MatSelectModule,
    NgxFileDropModule,
    HttpClientModule,
    NgbModule
  ],
  exports: [SubirPlantillaComponent, HttpClientModule],
  entryComponents: [SubirPlantillaComponent],
  providers: [
    Globals,
    AppRouteGuard,
    AppConfig,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppConfig], multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
