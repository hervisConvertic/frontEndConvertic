import { Color } from './color';
export interface ProductoGenero {
    id: number;
    stock: number;
    talla: Talla;
    producto: Producto;
}

export interface Producto {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    busqueda: number;
    imagen: string;
    color: Color;
    marca: Talla;
    genero: Talla;
}

export interface Talla {
    id: number;
    descripcion: string;
}


