import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-materiales',
  templateUrl: './materiales.component.html',
  styleUrls: ['./materiales.component.scss']
})
export class MaterialesComponent implements OnInit {

  

  title = 'angulartoastr';
  showModal: boolean;
  registerForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder ) { 
    
  }
  show()
  {
    this.showModal = true; 
  }
  hide()
  {
    this.showModal = false;
  }

  mostrar(){
    console.log(this.registerForm.value)
  }

  ngOnInit() {
    this.registerForm =  this.formBuilder.group({
        material: ['', [Validators.required]],
        pago: ['', [Validators.required]],
        fecha: ['', [Validators.required]],
        comentario: ['', [Validators.required]],
        ciempleado: ['', [Validators.required]],
        idproveedor: ['', [Validators.required]],
    });
  }

  get f() { return this.registerForm.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
        return;
    }
    if(this.submitted)
    {
      this.showModal = false;
    }
  }


  addMaterial(){
    console.log(this.registerForm.value);

  }

}