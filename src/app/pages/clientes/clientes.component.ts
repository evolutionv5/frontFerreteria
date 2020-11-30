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
  }
  agregarCliente() {
    this.clienteService.addClient(this.cliente).subscribe((res) => {
      this.getClientes();
      console.log(res);
    });
    this.showModal = false;
  }
}
