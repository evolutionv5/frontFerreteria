import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/interfaces';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})
export class ClientesComponent implements OnInit {

  filtroValue = '';
  search = new FormControl('');

  // clientes: Cliente[] = [
  //   {
  //     id: '0',
  //     ci: '234',
  //     name: 'henry',
  //     apPaterno: 'miranda',
  //     apMaterno: 'choque'
  //   },
  //   {
  //     id: '2',
  //     ci: '234',
  //     name: 'daniel',
  //     apPaterno: 'miranda',
  //     apMaterno: 'choque'
  //   },
  //   {
  //     id: '3',
  //     ci: '234',
  //     name: 'rene',
  //     apPaterno: 'miranda',
  //     apMaterno: 'choque'
  //   },
  //   {
  //     id: '4',
  //     ci: '234',
  //     name: 'juan',
  //     apPaterno: 'miranda',
  //     apMaterno: 'choque'
  //   },
  //   {
  //     id: '5',
  //     ci: '234',
  //     name: 'henry',
  //     apPaterno: 'miranda',
  //     apMaterno: 'choque'
  //   },
  //   {
  //     id: '6',
  //     ci: '234',
  //     name: 'henry',
  //     apPaterno: 'miranda',
  //     apMaterno: 'choque'
  //   },
  // ];

  public clientes: Cliente[];
  public cliente: Cliente;
  public editar = false;
  title = 'angulartoastr';
  showModal: boolean;
  registerForm: FormGroup;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    public clienteService: ClienteService,
  ) {
    this.resetData();
    this.getClientes();
  }
  getClientes() {
    this.clienteService.getClients().subscribe((res: Cliente[]) => {
      this.clientes = [...res];
    });
  }
  show() {
    this.showModal = true; // Show-Hide Modal Check
  }
  // Bootstrap Modal Close event
  hide() {
    this.showModal = false;
    this.resetData();
  }
  ngOnInit() {
    this.search.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
        this.filtroValue = value;
        console.log(value);
    });

    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    if (this.submitted) {
      this.showModal = false;
    }
  }

  resetData() {
    this.cliente = { ci: '', apPaterno: '', apMaterno: '', name: '' };
  }
  agregarCliente() {
    if (this.editar) {
      this.clienteService.updateClient(this.cliente).subscribe((res) => {
        this.getClientes();
        console.log(res);
        this.editar = false;
      });
    } else {
      this.clienteService.addClient(this.cliente).subscribe((res) => {
        this.getClientes();
        console.log(res);
      });
    }
    this.showModal = false;
  }
  eliminarCliente(cliente: Cliente): void {
    // this.clienteService.deleteClient(cliente.id).subscribe((res) => {
    this.clienteService.deleteClient2(cliente.id).subscribe((res) => {
      this.getClientes();
      console.log(res);
    });
  }
  editarCliente(cliente: Cliente) {
    this.cliente = { ...cliente };
    this.showModal = true;
    this.editar = true;
  }
}
