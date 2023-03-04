import { ProductoTalla } from './producto-talla';
import { Usuario } from './usuario';
export interface NuevoProductoCarrito {
    usuario: Usuario;
    productoTalla: ProductoTalla;
    cantidad: number;
}