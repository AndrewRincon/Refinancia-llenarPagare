import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Globals } from '../global/globals';
import { PagareDiligenciamientoModel } from '../modelos/pagareDiligenciamiento.model';
import { PeticionPagare } from '../modelos/peticionPagare';
import { RespuestaViewModel } from '../modelos/respuestaview.model';
import { CantidadMenuModel } from '../modelos/CantidadMenu.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PagaresService {

    constructor(private httpClient: HttpClient,
        public globals: Globals
    ) { }

    obtenerCantidadPagares(empresaId: number) {
      this.httpClient.get(`Pagare/ObtenerCantidadPagares/${empresaId}`).subscribe((Respuesta: RespuestaViewModel<CantidadMenuModel>) => {

          this.globals.cantidadPagares = Respuesta.resultado[0].cantidadPagaresInicial;
          this.globals.cantidadPagaresInicial = this.convert(Respuesta.resultado[0].cantidadPagaresInicial).toString();
          this.globals.cantidadEndososInicial = this.convert(Respuesta.resultado[0].cantidadEndososInicial).toString();
          this.globals.cantidadRecepcionPagares = this.convert(Respuesta.resultado[0].cantidadRecepcionPagares).toString();
          this.globals.cantidadProcesoPagares = this.convert(Respuesta.resultado[0].cantidadProcesoPagares).toString();
          this.globals.cantidadCanceladosPagares = this.convert(Respuesta.resultado[0].cantidadCanceladosPagares).toString();
      });
  }

  ValidarPagareDiligenciamiento(peticionPagare: PeticionPagare) {
    return this.httpClient.post(`Pagare/ValidarPagareDiligenciamiento/`, peticionPagare, httpOptions);
  }
  Diligenciamiento(peticionPagare: PagareDiligenciamientoModel) {
    return this.httpClient.post(`Pagare/Diligenciamiento/`, peticionPagare, httpOptions);
  }

  convert(value: number) {
        var length = (value + '').length,
            index = Math.ceil((length - 3) / 3),
            suffix = ['K', 'M', 'B', 'T'];

        if (length < 4) return value;
        return (value / Math.pow(1000, index)).toFixed(1) + suffix[index - 1];
    }

}
