import { ProductoTalla } from './producto-talla';

export interface CarritoCompra {
    id: number;
    productoTalla: ProductoTalla;
    cantidad: number;
} 