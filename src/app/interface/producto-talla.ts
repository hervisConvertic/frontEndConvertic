import { Talla } from './talla';
import { Producto } from './producto-genero';

export interface ProductoTalla {
    id: number;
    inventario: number;
    talla: Talla;
    producto: Producto;
} 