import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PedidoService } from '../../services/pedido.service';
import { Pedido } from '../../models/interfaces';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss'],
})
export class PedidosComponent implements OnInit {
  title = 'angulartoastr';
  showModal: boolean;
  registerForm: FormGroup;
  submitted = false;
  Pedidos;
  public pedidos: Pedido[];
  constructor(
    private formBuilder: FormBuilder,
    public pedidoService: PedidoService
  ) {
    pedidoService.getOrder().subscribe((res: Pedido[]) => {
      this.pedidos = [...res];
    });
  }
  show() {
    this.showModal = true; // Show-Hide Modal Check
  }
  //Bootstrap Modal Close event
  hide() {
    this.showModal = false;
    this.resetData();
  }

  resetData(){
    this.registerForm = this.formBuilder.group({
      material: '',
      marca: '',
      tipo: '',
      precio: '',
      cantidad: ''
    });
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      material: ['', [Validators.required]],
      marca: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      cantidad: ['', [Validators.required]]
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

  addPedido(){
    console.log(this.registerForm.value);
    this.pedidoService.addOrder(this.registerForm.value).subscribe((response) => {
      console.log(response);
    });
  } 
}
