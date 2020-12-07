import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VentaService } from '../../services/venta.service';
import { Venta } from '../../models/interfaces';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss'],
})
export class VentasComponent implements OnInit {
  title = 'angulartoastr';
  showModal: boolean;
  registerForm: FormGroup;
  submitted = false;
  Ventas;
  public ventas: Venta[];
  public venta: Venta;
  public editar = false;
  constructor(
    private formBuilder: FormBuilder,
    public ventaService: VentaService
  ) {
    this.getVentas();
    this.resetDataVentas();
  }
  getVentas() {
    this.ventaService.getSale().subscribe((res: Venta[]) => {
      this.ventas = [...res];
      console.log('[VENTAS]', res);
    });
  }
  show() {
    this.showModal = true; // Show-Hide Modal Check
  }
  resetDataVentas() {
    this.venta = {
      ci: '',
      fecha: '',
      montoCancelar: '',
      descripcion: '',
    };
  }
  hide() {
    this.showModal = false;
    this.resetData();
  }
  resetData() {
    this.registerForm = this.formBuilder.group({
      ci: '',
      fecha: '',
      montoCancelar: '',
      descripcion: '',
    });
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

  get f() {
    return this.registerForm.controls;
  }
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      ci: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      montoCancelar: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      
    });
  }
  addVenta() {
    if (this.editar) {
      this.ventaService.updateSale(this.venta).subscribe((res) => {
        this.getVentas();
        console.log(res);
        this.editar = false;
      });
    } else {
      this.ventaService.addSale(this.venta).subscribe((res) => {
        this.getVentas();
        console.log(res);
      });
    }
    this.showModal = false;
  }
  eliminarVenta(venta: Venta): void {
    this.ventaService.deleteVenta(venta.id).subscribe((res) => {
      this.getVentas();
      console.log(res);
    });
  }
  editarVenta(venta: Venta) {
    this.venta = { ...venta };
    this.showModal = true;
    this.editar = true;
  }
}
