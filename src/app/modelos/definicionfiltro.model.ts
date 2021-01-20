export class DefinicionFiltroModel {
    public ordenacion: OrdenacionModel[] = []; 
    public indicePagina: number = 1;
    public registrosPagina: number = 15;
    public totalRegistros: number = 0;
    public filtros: FiltroModel[] = []; 
}

export class FiltroModel {

    constructor(columna: string, valor: string, condicion: string = "=", operador: string = "AND", valorFin?: string) {

        this.operador = operador;
        this.columna = columna;
        this.valor = valor;
        this.condicion = condicion;
        this.valorFin = valorFin;
    }

    public operador: string;
    public columna: string;
    public condicion: string = "=";
    public valor: string;
    public valorFin?: string;
}

export class OrdenacionModel {

    constructor(columnaOrden: string, direccionOrden: string) {

        this.columnaOrden = columnaOrden;
        this.direccionOrden = direccionOrden;

    }
    public columnaOrden: string = "ASC";
    public direccionOrden?: string;
}


