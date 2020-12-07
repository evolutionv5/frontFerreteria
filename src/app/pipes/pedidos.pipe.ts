import { Pipe, PipeTransform } from '@angular/core';
import { Pedido } from '../models/interfaces';

@Pipe({
  name: 'pedidospipe'
})
export class PedidosPipe implements PipeTransform {

  transform(lista: Pedido[], texto: string): Pedido[] {
    if (!texto) {
        return lista;
    }
      return lista.filter((pedido) => pedido.nombreProveedor.toUpperCase().includes(texto.toUpperCase()));
  }

}
