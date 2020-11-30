import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Empleado } from '../../models/empleado.interface';
import { EmpleadoService } from '../../services/empleado.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.scss'],
})
export class EmpleadosComponent implements OnInit {

  title = 'angulartoastr';
  showModal: boolean;
  registerForm: FormGroup;
  submitted = false;
  Empleados;
  editar = false;
  identy;

  constructor(private formBuilder: FormBuilder, private serviceempleado: EmpleadoService) {
    // this.Empleados = [
    //   {
    //     id: 0,
    //     ci: "911",
    //     name: "henry",
    //     apPaterno: "miranda",
    //     apMaterno: "choque",
    //     direccion: "aca nomas",
    //     telefono: "6324",
    //     correo: "henry@usuario",
    //     tipo: "admin"
    //   },
    // ];
  }

  show(it, id)
  {
    this.showModal = true; 
    if(it){
      this.editar = false;
    }else{
      this.identy = id;
      this.editar = true;
    }
  }

  hide()
  {
    this.showModal = false;
  }

  ngOnInit() {
    this.registerForm =  this.formBuilder.group({
        ci: ['', [Validators.required]],
        name: ['', [Validators.required]],
        apPaterno: ['', [Validators.required]],
        apMaterno: ['', [Validators.required]],
        direccion: ['', [Validators.required]],
        telefono: ['', [Validators.required]],
        correo: ['', [Validators.required]],
        tipo: ['', [Validators.required]]
    });

    this.listarEmpleados();
  }

  get f() { return this.registerForm.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
        return;
    }
    if(this.submitted)
    {
      this.showModal = false;
    }
  }

  addEmpleado(): void {
    if(!this.editar){
      this.editarEmpleado();
    }else{
    console.log("añadiendo...");
      console.log(this.registerForm.value);
    const emp = {
      ci: this.registerForm.value.ci,
      name: this.registerForm.value.name,
      apPaterno: this.registerForm.value.apPaterno,
      apMaterno: this.registerForm.value.apMaterno,
      direccion: this.registerForm.value.direccion,
      telefono: this.registerForm.value.telefono,
      correo: this.registerForm.value.correo,
      tipo: this.registerForm.value.tipo,
    };
    this.serviceempleado.addEmployee(emp).subscribe(
      (response) => {
        console.log(response);
      },
      (er) => console.log(er)
    );
    }
  }

  listarEmpleados(){
    this.serviceempleado.getEmployees().subscribe(
      (response) => {
        console.log(response);
        this.Empleados = response;
      },
      (er) => console.log(er)
    );
  }

  editarEmpleado(){
    console.log("editando...");
    console.log(this.registerForm.value);
    const response = {
      lat: -51.3303,
      lng: 0.39440
    }
 
    let item = {
          id: 'qwenhee-9763ae-lenfya',
          address: '14-22 Elder St, London, E1 6BT, UK'
    }
 
 const newItem = Object.assign({}, this.registerForm.value, { id: this.identy });
    console.log(newItem);
    this.serviceempleado.updateEmployee(newItem).subscribe(
      (response) => {
        console.log(response);
      },
      (er) => console.log(er)
    );
  }

  borrarEmpleado(id){
    this.serviceempleado.deleteEmployee(id).subscribe(
      (response) => {
        console.log(response);
      },
      (er) => console.log(er)
    );
  }
}
