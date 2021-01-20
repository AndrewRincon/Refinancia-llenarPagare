import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, observable } from 'rxjs';
import { RespuestaBaseHttp } from '../modelos/respuestabase.model';

@Injectable({
  providedIn: 'root'
})
export class FiledataService {
  
  private filesData = new BehaviorSubject<RespuestaBaseHttp>(null)
  private firmantes = new BehaviorSubject<any[]>([])
  private pdfsrc = new BehaviorSubject<Uint8Array>(new Uint8Array)
  private fileName = new BehaviorSubject<any>({})
  private procesoClienteExterno = new BehaviorSubject<any>({})
  filesListener$ = this.filesData.asObservable()
  firmantesListener$ = this.firmantes.asObservable()
  pdfsrcListener$ = this.pdfsrc.asObservable()
  fileNameListener$ = this.fileName.asObservable()
  procesoClienteExterno$ = this.procesoClienteExterno.asObservable()

  constructor() { }

  addFiles(arr: RespuestaBaseHttp){
    this.filesData.next(arr)
  }

  addFirmantes(arr:any[]){
    this.firmantes.next(arr)
  } 

  addPdf(string:Uint8Array){
    this.pdfsrc.next(string)
  }

  addFileName(fileName: any) {
    this.fileName = fileName;
  }

  addProcesoClienteExterno(procesoClienteExterno: any) {
    this.procesoClienteExterno.next(procesoClienteExterno);
  }
}
