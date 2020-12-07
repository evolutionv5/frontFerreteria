import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { VentasComponent } from './pages/ventas/ventas.component';
import { MaterialesComponent } from './pages/materiales/materiales.component';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { EmpleadosComponent } from './pages/empleados/empleados.component';
import { HomeComponent } from './pages/home/home.component';

//Pipes
import { ClientePipe } from './pipes/cliente.pipe';
import { EmpleadoPipe } from './pipes/empleado.pipe';
import { MaterialesPipe } from './pipes/materiales.pipe';
import { PedidosPipe } from './pipes/pedidos.pipe';
import { ProveedorPipe } from './pipes/proveedor.pipe';
import { VentasPipe } from './pipes/ventas.pipe';

//Forms
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductoPipe } from './pipes/producto.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ClientesComponent,
    VentasComponent,
    MaterialesComponent,
    ProveedoresComponent,
    PedidosComponent,
    EmpleadosComponent,
    HomeComponent,
    ClientePipe,
    EmpleadoPipe,
    MaterialesPipe,
    PedidosPipe,
    ProveedorPipe,
    VentasPipe,
    ProductoPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
