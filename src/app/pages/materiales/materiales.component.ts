import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/interfaces';

@Component({
  selector: 'app-materiales',
  templateUrl: './materiales.component.html',
  styleUrls: ['./materiales.component.scss'],
})
export class MaterialesComponent implements OnInit {
  title = 'angulartoastr';
  showModal: boolean;
  registerForm: FormGroup;
  submitted = false;
  public productos: Producto[];
  public producto: Producto;
  public editar = false;
  constructor(
    private formBuilder: FormBuilder,
    public productoService: ProductoService
  ) {
    this.getProductos();
    this.resetDataProductos();
  }
  getProductos() {
    this.productoService.getProduct().subscribe((res: Producto[]) => {
      this.productos = [...res];
    });
  }
  resetDataProductos() {
    this.producto = { nombre: '', tipo: '', precio: '', cantidad: '' };
  }
  show() {
    this.showModal = true;
  }
  hide() {
    this.showModal = false;
    this.resetData();
  }

  resetData() {
    this.registerForm = this.formBuilder.group({
      nombre: '',
      precio: '',
      tipo: '',
      cantidad: '',
    });
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      cantidad: ['', [Validators.required]],
    });
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

  addMaterial() {
    if (this.editar) {
      this.productoService.updateProduct(this.producto).subscribe((res) => {
        this.getProductos();
        console.log(res);
        this.editar = false;
      });
    } else {
      this.productoService
        .addProduct(this.registerForm.value)
        .subscribe((response) => {
          console.log(response);
        });
      console.log(this.registerForm.value);
    }
    this.showModal = false;
  }
  eliminarProducto(producto: Producto) {
    this.productoService.deleteProduct(producto.id).subscribe((res) => {
      this.getProductos();
      console.log(res);
    });
  }
  editarProducto(producto: Producto) {
    this.producto = { ...producto };
    this.showModal = true;
    this.editar = true;
  }
}
