export interface Login {
  user: string;
  password: string;
}

export interface Empleado {
  id?: string;
  ci: string;
  name: string;
  apPaterno: string;
  apMaterno: string;
  direccion: string;
  telefono: string;
  correo: string;
  tipo: string;
}

export interface Cliente {
  id?: string;
  ci: string;
  name: string;
  apPaterno: string;
  apMaterno: string;
}

export interface Pedido {
  id?: string;
  pago: string;
  fecha: string;
  comentario: string;
}

export interface Producto {
  id?: string;
  nombre: string;
  tipo: string;
  precioUnidad: string;
  cantidad: string;
}

export interface Proveedor {
  nombreEmpresa: string;
  direccion: string;
  telefono: string;
}

export interface Venta {
  descripcion: string;
  fecha: string;
  pago: string;
}
