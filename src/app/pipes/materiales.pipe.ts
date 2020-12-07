import { Pipe, PipeTransform } from '@angular/core';
import { Producto } from '../models/interfaces';

@Pipe({
  name: 'materialespipe'
})
export class MaterialesPipe implements PipeTransform {

  transform(lista: Producto[], texto: string): Producto[] {
    if (!texto) {
        return lista;
    }
      return lista.filter((producto) => producto.nombre.toUpperCase().includes(texto.toUpperCase()));
  }

}
