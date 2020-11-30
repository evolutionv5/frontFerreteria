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
  constructor(
    private formBuilder: FormBuilder,
    public productoService: ProductoService
  ) {
    productoService.getProduct().subscribe((res: Producto[]) => {
      this.productos = [...res];
    });
  }
  show() {
    this.showModal = true;
  }
  hide() {
    this.showModal = false;
    this.resetData();
  }

  resetData(){
    this.registerForm = this.formBuilder.group({
      material: '',
      pago: '',
      fecha: '',
      comentario: '',
      ciempleado: '',
      idproveedor: ''
    }); 
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      material: ['', [Validators.required]],
      pago: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      comentario: ['', [Validators.required]],
      ciempleado: ['', [Validators.required]],
      idproveedor: ['', [Validators.required]],
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
    this.productoService.addProduct(this.registerForm.value).subscribe((response)=>{
      console.log(response);
    });
    console.log(this.registerForm.value);
  }
}
