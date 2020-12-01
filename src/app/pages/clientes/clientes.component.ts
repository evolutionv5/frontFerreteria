import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/interfaces';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})
export class ClientesComponent implements OnInit {
  public clientes: Cliente[];
  public cliente: Cliente;
  public clienteParaEditar: Cliente;
  public editar = false;
  title = 'angulartoastr';
  showModal: boolean;
  registerForm: FormGroup;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    public clienteService: ClienteService
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
    this.clienteParaEditar = { ci: '', apPaterno: '', apMaterno: '', name: '' };
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
    this.clienteService.deleteClient(cliente.id).subscribe((res) => {
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
