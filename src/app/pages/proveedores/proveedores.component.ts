import { Component, OnInit } from '@angular/core';
import { ProveedorService } from '../../services/proveedor.service';
import { Proveedor } from '../../models/interfaces';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.scss'],
})
export class ProveedoresComponent implements OnInit {
  public proveedores: Proveedor[];
  constructor(public proveedorService: ProveedorService) {
    this.proveedorService.getProvider().subscribe((res: Proveedor[]) => {
      this.proveedores = [...res];
    });
  }

  ngOnInit(): void {}
}
