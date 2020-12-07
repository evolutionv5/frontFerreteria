import { Pipe, PipeTransform } from '@angular/core';
import { Producto } from '../models/interfaces';

@Pipe({
  name: 'productopipe'
})
export class ProductoPipe implements PipeTransform {

  transform(lista: Producto[], texto: string): Producto[] {
    if (!texto) {
        return lista;
    }
      return lista.filter((pedido) => pedido.nombre.toUpperCase().includes(texto.toUpperCase()));
  }

}
