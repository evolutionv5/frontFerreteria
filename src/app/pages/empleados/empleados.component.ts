import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpleadoService } from '../../services/empleado.service';
import { Empleado } from '../../models/interfaces';

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
  identy;
  public empleados: Empleado[];
  public empleado: Empleado;
  public editar = false;

  constructor(
    private formBuilder: FormBuilder,
    private serviceempleado: EmpleadoService,
    public empleadoService: EmpleadoService
  ) {
    this.getEmpleados();
    this.resetDataEmpleado();
  }

  getEmpleados() {
    this.empleadoService.getEmployees().subscribe((res: Empleado[]) => {
      this.empleados = [...res];
    });
  }
  show(it, id) {
    this.showModal = true;
    if (!it) {
      this.editar = true;
    } else {
      this.identy = id;
      this.editar = false;
    }
  }

  hide() {
    this.showModal = false;
    this.resetData();
  }
  resetDataEmpleado() {
    this.empleado = {
      ci: '',
      name: '',
      apPaterno: '',
      apMaterno: '',
      direccion: '',
      telefono: '',
      correo: '',
      tipo: '',
    };
  }
  resetData() {
    this.registerForm = this.formBuilder.group({
      ci: '',
      name: '',
      apPaterno: '',
      apMaterno: '',
      direccion: '',
      telefono: '',
      correo: '',
      tipo: '',
    });
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      ci: ['', [Validators.required]],
      name: ['', [Validators.required]],
      apPaterno: ['', [Validators.required]],
      apMaterno: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
    });

    // this.listarEmpleados();
  }

  get f() {
    return this.registerForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    if (this.submitted) {
      this.showModal = false;
    }
  }

  addEmpleado(): void {
    if (this.editar) {
      this.empleadoService.updateEmployee(this.empleado).subscribe((res) => {
        this.getEmpleados();
        console.log(res);
        this.editar = false;
      });
    } else {
      this.empleadoService.addEmployee(this.empleado).subscribe((res) => {
        this.getEmpleados();
        console.log(res);
      });
    }
    this.showModal = false;
  }

  listarEmpleados() {
    this.serviceempleado.getEmployees().subscribe(
      (response) => {
        console.log(response);
        this.Empleados = response;
      },
      (er) => console.log(er)
    );
  }

  borrarEmpleado(empleado: Empleado) {
    this.empleadoService.deleteEmployee(empleado.id).subscribe((res) => {
      this.getEmpleados();
      console.log(res);
    });
  }
  editarEmpleado(empleado: Empleado) {
    this.empleado = { ...empleado };
    this.showModal = true;
    this.editar = true;
  }
}
