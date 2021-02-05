import { Routes, RouterModule } from '@angular/router';
import { AppLayoutMainComponent } from "./layouts/layout-main/layout-main.component";
import { NgModule } from '@angular/core';
import { CrearPlantillaComponent } from './vistas/main/crear-plantilla/crear-plantilla.component';
import { AdminPlantillasComponent } from './vistas/main/admin-plantillas/admin-plantillas.component';
import { AppLayoutMainPlantillaComponent } from './layouts/layout-main-plantilla/layout-main-plantilla.component';
import { AppRouteGuard } from './core/guards/route.guard';
import { PreviewPlantillaComponent } from './vistas/main/preview-plantilla/preview-plantilla.component';
import { DemoComponent } from './vistas/demo/demo.component';

const routes: Routes = [
  {
    path: "",
      component: AppLayoutMainPlantillaComponent,
        children: [
          {
            path: '',
            component: CrearPlantillaComponent
          }
        ]
  },
  {
    path: "",
    component: AppLayoutMainComponent,
    children: [
      {
        path: 'previewplantilla/:pagareSerial/:documento/:empresaActualId/:empresaActualNombre/:loginToken/:tipoDocumento',
        component: PreviewPlantillaComponent
      }     
    ]
  },
  {
    path: "",
    component: AppLayoutMainPlantillaComponent,
    children: [
      {
        path: 'plantilla',
        component: CrearPlantillaComponent
      }
    ]
  },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

