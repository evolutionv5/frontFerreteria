import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { VentasComponent } from './pages/ventas/ventas.component';
import { MaterialesComponent } from './pages/materiales/materiales.component';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { EmpleadosComponent } from './pages/empleados/empleados.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: 'cliente', component: ClientesComponent },
  { path: 'venta', component: VentasComponent },
  { path: 'material', component: MaterialesComponent },
  { path: 'proveedor', component: ProveedoresComponent },
  { path: 'pedido', component: PedidosComponent },
  { path: 'empleado', component: EmpleadosComponent },
  { path: 'home', component: HomeComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'cliente' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
