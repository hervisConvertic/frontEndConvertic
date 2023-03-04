import { ProductoTalla } from './producto-talla';
import { Usuario } from './usuario';

export interface CarritoCompra {
    id: number;
    usuario: Usuario;
    productoTalla: ProductoTalla;
    cantidad: number;
} 