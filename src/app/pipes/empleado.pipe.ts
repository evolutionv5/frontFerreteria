import { Pipe, PipeTransform } from '@angular/core';
import { Empleado } from '../models/interfaces';

@Pipe({
  name: 'empleadopipe'
})
export class EmpleadoPipe implements PipeTransform {

  transform(lista: Empleado[], texto: string): Empleado[] {
    if (!texto) {
        return lista;
    }
      return lista.filter((empleado) => empleado.name.toUpperCase().includes(texto.toUpperCase()));
  }

}
