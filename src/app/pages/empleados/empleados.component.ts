import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { EmpleadoService } from '../../services/empleado.service';
import { Empleado } from '../../models/interfaces';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.scss'],
})
export class EmpleadosComponent implements OnInit {

  filtroValue = '';
  search = new FormControl('');


  title = 'angulartoastr';
  showModal: boolean;
  registerForm: FormGroup;
  submitted = false;
  Empleados;
  identy;

  // empleados: Empleado[] = [
  //   { id: '0',
  //     ci: 'cuals',
  //     name: 'cuals',
  //     apPaterno: 'cuals',
  //     apMaterno: 'cuals',
  //     direccion: 'cuals',
  //     telefono: 'cuals',
  //     correo: 'cuals',
  //     tipo: 'cuals'},
  //     { id: '1',
  //     ci: 'otro',
  //     name: 'otro',
  //     apPaterno: 'otro',
  //     apMaterno: 'otro',
  //     direccion: 'otro',
  //     telefono: 'otro',
  //     correo: 'otro',
  //     tipo: 'otro'}
  // ];
  public empleados: Empleado[];
  public empleado: Empleado;
  public editar = false;

  constructor(
    private formBuilder: FormBuilder,
    private serviceempleado: EmpleadoService,
    public empleadoService: EmpleadoService
  ) {
    this.resetDataEmpleado();
    this.getEmpleados();
  }

  getEmpleados() {
    this.empleadoService.getEmployees().subscribe((res: Empleado[]) => {
      this.empleados = [...res];
    });
  }
  show() {
    this.showModal = true;
  }

  hide() {
    this.showModal = false;
    this.resetData();
    this.resetDataEmpleado();
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
    this.search.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      this.filtroValue = value;
      console.log(value);
    });

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
      console.log('EDITANDO EMPLEADO');
      this.empleadoService.updateEmployee(this.empleado).subscribe((res) => {
        this.getEmpleados();
        console.log(res);
        this.editar = false;
      });
    } else {
      console.log('AGREGANDO EMPLEADO');
      this.empleadoService.addEmployee(this.empleado).subscribe((res) => {
        this.getEmpleados();
        console.log(res);
      });
    }
    this.showModal = false;
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
