import { Component, OnInit } from '@angular/core';
import { Producto, Venta } from '../../models/interfaces';
import { ProductoService } from '../../services/producto.service';
import { VentaService } from '../../services/venta.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss'],
})
export class VentasComponent implements OnInit {
  public productos: Producto[];
  public ventas: Venta[];
  constructor(
    public productoService: ProductoService,
    ventaService: VentaService
  ) {
    productoService.getProduct().subscribe((res: Producto[]) => {
      this.productos = [...res];
    });
    ventaService.getSale().subscribe((res: Venta[]) => {
      this.ventas = [...res];
    });
  }

  ngOnInit(): void {}
}
