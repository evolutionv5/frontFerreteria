import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../../services/empleado.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.scss']
})
export class EmpleadosComponent implements OnInit {

  constructor(private serviceempleado: EmpleadoService) { }

  ngOnInit(): void {
  }


  añadirEmpleado(){
    var emp = {ci: '77346', name: 'roger', apPaterno: 'chura',apMaterno: 'siñani', direccion: 'aca nomas', telefono: '1254', correo: 'ro@gmail.com'};
    this.serviceempleado.addEmpleado(emp).subscribe(
      (response) => {
          console.log(response);
      },
      (er) => console.log(er),
  );
  }

}
