import { DefinicionFiltroModel } from './definicionfiltro.model';
import { RespuestaBase } from './respuestabase.model';

export class RespuestaViewModel<T> extends RespuestaBase {
    public definicionFiltro: DefinicionFiltroModel;
    public resultado: Array<T> = [];
}
