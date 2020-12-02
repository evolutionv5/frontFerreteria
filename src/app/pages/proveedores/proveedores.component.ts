import { Component, OnInit } from '@angular/core';
import { ProveedorService } from '../../services/proveedor.service';
import { Proveedor } from '../../models/interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.scss'],
})
export class ProveedoresComponent implements OnInit {
  title = 'angulartoastr';
  showModal: boolean;
  registerForm: FormGroup;
  submitted = false;
  public proveedores: Proveedor[];
  public proveedor: Proveedor;
  public editar = false;
  constructor(
    private formBuilder: FormBuilder,
    public proveedorService: ProveedorService
  ) {
    this.getProveedor();
    this.resetDataProveedor();
  }

  getProveedor() {
    this.proveedorService.getProvider().subscribe((res: Proveedor[]) => {
      this.proveedores = [...res];
    });
  }
  resetDataProveedor() {
    this.proveedor = { nombreEmpresa: '', direccion: '', telefono: '' };
  }
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      nombreEmpresa: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
    });
  }

  addProveedor() {
    if (this.editar) {
      this.proveedorService.updateProvider(this.proveedor).subscribe((res) => {
        this.getProveedor();
        console.log(res);
        this.editar = false;
      });
    } else {
      this.proveedorService
        .addProvider(this.registerForm.value)
        .subscribe((response) => {
          this.getProveedor();
          console.log(response);
        });
    }
    this.showModal = false;
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

  resestData() {
    this.registerForm = this.formBuilder.group({
      nombreEmpresa: '',
      direccion: '',
      telefono: '',
    });
  }

  show() {
    this.showModal = true;
  }

  hide() {
    this.showModal = false;
    this.resestData();
  }
  eliminarProveedor(proveedor: Proveedor) {
    this.proveedorService.deleteProveedor(proveedor.id).subscribe((res) => {
      this.getProveedor();
      console.log(res);
    });
  }
  editarProveedor(proveedor: Proveedor) {
    this.proveedor = { ...proveedor };
    this.showModal = true;
    this.editar = true;
  }
}
