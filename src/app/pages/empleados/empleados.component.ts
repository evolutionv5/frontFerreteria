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
  Empleados ;

  constructor(private formBuilder: FormBuilder, private serviceempleado: EmpleadoService) {}

  show()
  {
    this.showModal = true; 
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

  listarEmpleados(){
    this.serviceempleado.getEmployees().subscribe(
      (response) => {
        console.log(response);
        this.Empleados = response;
      },
      (er) => console.log(er)
    );
  }
}
