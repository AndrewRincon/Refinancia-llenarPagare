import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
//import { PDFDocument } from 'pdf-lib';
//import { LoaderService } from 'src/app/core/services/loader.service';
//import { DocumentosService } from 'src/app/servicios/documentos.service';
//import { FiledataService } from 'src/app/servicios/filedata.service';
//import { ParamsService } from 'src/app/servicios/params/params.service';
//import { ScriptsService } from 'src/app/servicios/scripts.service';
//import { TemplatesService } from 'src/app/servicios/templates.service';
import { SubirPlantillaComponent } from 'src/app/vistas/modales/subir-plantilla/subir-plantilla.component';
import { Globals } from '../../../global/globals';
import { RespuestaBaseHttp } from '../../../modelos/respuestabase.model';
import { FiledataService } from '../../../servicios/filedata.service';
import { PagaresService } from '../../../servicios/pagares.service';
//import * as Utils from 'src/app/Utilidades/utils';
//import { FirmantesTemplateComponent } from 'src/app/vistas/modales/firmantes-template/firmantes-template.component';
//import { ViewTemplateComponent } from 'src/app/vistas/modales/view-template/view-template.component';
//import { SessionService } from 'src/app/servicios';
//import { MensajesComponent } from 'src/app/vistas/modales/mensajes/mensajes.component';

declare const OneDrive: any;

@Component({
  selector: 'app-admin-plantillas',
  templateUrl: './admin-plantillas.component.html',
  styleUrls: ['./admin-plantillas.component.css']
})
export class AdminPlantillasComponent implements OnInit {

  constructor(
    private pagareService: PagaresService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private fdService: FiledataService,
    //private scriptService: ScriptsService,
    //private paramsService: ParamsService,
    //private documentService: DocumentosService,
    private router: Router
    //private templatesService: TemplatesService,
    //private sessionService: SessionService
  ) {
  }

  menuOpen = false;
  lastIndexMenuOpen = -1;
  maxBytes = 20866662.4;
  scriptsLoaded = false;
  modalRef2: NgbModalRef;
  // Collection of documents the user has added
  docs: any[] = [];
  clientId: string;
  page: number = 1;
  templates = [];
  wordSearch: string = '';
  ProcesoCliente: string = "";

  ngOnInit() {
  }

  @HostListener('document:click', ['$event'])
  documentClick(event: any): void {
    if (this.lastIndexMenuOpen !== -1 && this.templates.length > 0) {
      this.templates[this.lastIndexMenuOpen].menuOpen = false;
    }
  }

  menuOption(i: number, e: MouseEvent) {
    e.stopPropagation();
    this.lastIndexMenuOpen = i;
    if (this.lastIndexMenuOpen !== -1 && this.templates[i] !== this.templates[this.lastIndexMenuOpen]) {
      this.templates[this.lastIndexMenuOpen].menuOpen = false;
    }
    this.templates[i].menuOpen = !this.templates[i].menuOpen;
    this.lastIndexMenuOpen = i;
  }

  arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  /**
   * Removes a document from the list
   * @param index The index of the file to be removed
   */
  deleteDoc(index: number): void {
    this.docs.splice(index, 1);
  }

  blobToFile(theBlob, fileName) {
    // A Blob() is almost a File() - it's just missing the two properties below which we will add
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
  }

  crearPlantilla() {
    if (this.ProcesoCliente != null && this.ProcesoCliente.length > 0) {
      this.pagareService.ValidarPagareDiligenciamiento({ IdProcesoClienteExterno: this.ProcesoCliente}).subscribe((Respuesta: RespuestaBaseHttp) => {
        if (Respuesta.codigoHttp == 200) {
          this.fdService.addPagareSerial(this.ProcesoCliente);//cambia por procesoClienteExterno
          this.fdService.addFiles(Respuesta);
          //this.fdService.addFileName(Respuesta.mensaje);
          this.router.navigateByUrl('plantilla');
        } else {
          if (Respuesta.mensaje != null) {
            this.toastr.error(Respuesta.mensaje);
          } else {
            this.toastr.error("No fue posible validar el procesoCliente Externo, inténtelo más tarde");
          }
        }
      }, (error: any) => {
        this.toastr.error("No fue posible validar el procesoCliente Externo, inténtelo más tarde");
      });
    } else {
      this.toastr.error("por favor ingrese el procesoCliente Externo");
    }
  }
searchAllTemplates() {
    this.wordSearch = '';
  }
  editTemplate(i: number) {
    const id = this.templates[i].id;
    this.router.navigateByUrl('plantilla/' + id);
  }

  verifyPDF(name: string): boolean {
    const arr = name.split('.');
    const pdf = 'pdf';
    let typeDocument = arr[arr.length - 1];
    typeDocument = typeDocument.toLowerCase();
    return typeDocument === pdf;
  }

}
