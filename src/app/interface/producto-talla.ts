import { Talla } from './talla';
import { Producto } from './producto-genero';

export interface ProductoTalla {
    id: number;
    stock: number;
    talla: Talla;
    producto: Producto;
} 