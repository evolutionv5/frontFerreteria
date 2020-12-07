import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/interfaces';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-materiales',
  templateUrl: './materiales.component.html',
  styleUrls: ['./materiales.component.scss'],
})
export class MaterialesComponent implements OnInit {

  filtroValue = '';
  search = new FormControl('');

  title = 'angulartoastr';
  showModal: boolean;
  registerForm: FormGroup;
  submitted = false;

  // productos: Producto[] = [
  //   {id: 'hola',
  //     nombre: 'hola',
  //     tipo: 'hola',
  //     precioUnidad: 'hola',
  //     cantidad: 'hola'},
  //     {id: 'chau',
  //     nombre: 'chau',
  //     tipo: 'chau',
  //     precioUnidad: 'chau',
  //     cantidad: 'chau'},
  // ]
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
    this.producto = { nombre: '', tipo: '', precioUnidad: '', cantidad: '' };
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
      precioUnidad: '',
      tipo: '',
      cantidad: '',
    });
  }

  ngOnInit() {
    this.search.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      this.filtroValue = value;
      console.log(value);
    });

    this.registerForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      precioUnidad: ['', [Validators.required]],
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
          this.getProductos();
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
