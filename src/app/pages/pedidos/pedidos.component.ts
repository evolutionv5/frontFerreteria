import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PedidoService } from '../../services/pedido.service';
import { Pedido } from '../../models/interfaces';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss'],
})
export class PedidosComponent implements OnInit {

  filtroValue = '';
  search = new FormControl('');

  title = 'angulartoastr';
  showModal: boolean;
  registerForm: FormGroup;
  submitted = false;
  Pedidos;

  public pedidos: Pedido[];
  public pedido: Pedido;
  public editar = false;
  constructor(
    private formBuilder: FormBuilder,
    public pedidoService: PedidoService
  ) {
    this.getPedidos();
    this.resetDataPedidos();
  }
  getPedidos() {
    this.pedidoService.getOrders().subscribe((res: Pedido[]) => {
      this.pedidos = [...res];
      console.log('[PEDIDOS]', res);
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
  resetDataPedidos() {
    this.pedido = {
      nombreProveedor: '',
      cantidadDePedido: '',
      pago: 0,
      fecha: '',
      comentario: '',
    };
  }

  resetData() {
    this.registerForm = this.formBuilder.group({
      nombreProveedor: '',
      cantidadDePedido: '',
      pago: '',
      fecha: '',
      comentario: '',
    });
  }

  ngOnInit() {
    this.search.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      this.filtroValue = value;
      console.log(value);
    });

    this.registerForm = this.formBuilder.group({
      nombreProveedor: ['', [Validators.required]],
      cantidadDePedido: ['', [Validators.required]],
      pago: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      comentario: ['', [Validators.required]],
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

  // addPedido(){
  //   console.log(this.registerForm.value);
  //   this.pedidoService.addOrder(this.registerForm.value).subscribe((response) => {
  //     console.log(response);
  //   });
  // }
  addPedido() {
    if (this.editar) {
      this.pedidoService.updateOrder(this.pedido).subscribe((res) => {
        this.getPedidos();
        console.log(res);
        this.editar = false;
      });
    } else {
      this.pedidoService.addOrder(this.pedido).subscribe((res) => {
        this.getPedidos();
        console.log(res);
      });
    }
    this.showModal = false;
  }
  eliminarPedido(pedido: Pedido): void {
    // this.clienteService.deleteClient(cliente.id).subscribe((res) => {
    this.pedidoService.deletePedido(pedido.id).subscribe((res) => {
      this.getPedidos();
      console.log(res);
    });
  }
  editarPedido(pedido: Pedido) {
    this.pedido = { ...pedido };
    this.showModal = true;
    this.editar = true;
  }
}
