import { Pipe, PipeTransform } from '@angular/core';
import { Venta } from '../models/interfaces';

@Pipe({
  name: 'ventaspipe'
})
export class VentasPipe implements PipeTransform {

  transform(lista: Venta[], texto: string): Venta[] {
    if (!texto) {
        return lista;
    }
      return lista.filter((venta) => venta.descripcion.toUpperCase().includes(texto.toUpperCase()));
  }

}
