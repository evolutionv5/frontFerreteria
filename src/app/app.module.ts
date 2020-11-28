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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
