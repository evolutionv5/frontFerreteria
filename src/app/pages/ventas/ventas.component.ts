import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
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
  
  // variables para la busqueda
  filtroValue = '';
  search = new FormControl('');
  
  public ventas: Venta[];


  // ventas:Venta[] = [{
  //   id: '0',
  //   descripcion: 'asdf',
  //   fecha: 'sdf',
  //   pago: 'sdfsdf'
  // },{
  //   id: '1',
  //   descripcion: 'asdf',
  //   fecha: 'sdf',
  //   pago: 'sdfsdf'
  // },{
  //   id: '2',
  //   descripcion: 'asdf',
  //   fecha: 'sdf',
  //   pago: 'sdfsdf'
  // },{
  //   id: '3',
  //   descripcion: 'asdf',
  //   fecha: 'sdf',
  //   pago: 'sdfsdf'
  // },{
  //   id: '4',
  //   descripcion: 'asdf',
  //   fecha: 'sdf',
  //   pago: 'sdfsdf'
  // },{
  //   id: '5',
  //   descripcion: 'asdf',
  //   fecha: 'sdf',
  //   pago: 'sdfsdf'
  // }];
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

  ngOnInit(): void {
    this.search.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      this.filtroValue = value;
      console.log(value);
    });
  }

}
