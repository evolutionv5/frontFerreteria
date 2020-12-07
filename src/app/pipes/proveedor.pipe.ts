import { Pipe, PipeTransform } from '@angular/core';
import { Proveedor } from '../models/interfaces';

@Pipe({
  name: 'proveedorpipe'
})
export class ProveedorPipe implements PipeTransform {

  transform(lista: Proveedor[], texto: string): Proveedor[] {
    if (!texto) {
        return lista;
    }
      return lista.filter((proveedor) => proveedor.nombreEmpresa.toUpperCase().includes(texto.toUpperCase()));
  }

}
