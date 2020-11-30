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
  constructor(private formBuilder: FormBuilder, public proveedorService: ProveedorService) {
    this.proveedorService.getProvider().subscribe((res: Proveedor[]) => {
      this.proveedores = [...res];
    });
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      nombreEmpresa: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required]]
    });
  }

  addProveedor(){
    this.proveedorService.addProvider(this.registerForm.value).subscribe((response)=>{
      console.log(response);
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

  resestData(){
    this.registerForm = this.formBuilder.group({
      nombreEmpresa: '',
      direccion: '',
      telefono: ''
    });
  }

  show()
  {
    this.showModal = true; 
  }

  hide()
  {
    this.showModal = false;
    this.resestData();
  }
}
