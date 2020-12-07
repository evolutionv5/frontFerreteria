import { Pipe, PipeTransform } from '@angular/core';
import { Cliente } from '../models/interfaces';

@Pipe({
  name: 'clientepipe'
})
export class ClientePipe implements PipeTransform {
  transform(lista: Cliente[], texto: string): Cliente[] {
    if (!texto) {
        return lista;
    }
      return lista.filter((cliente) => cliente.name.toUpperCase().includes(texto.toUpperCase()));
  }
}
