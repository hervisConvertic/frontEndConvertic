import { Color } from './color';
export interface Producto {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    busqueda: number;
    imagen: string;
    color: Color;
    marca: Genero;
    genero: Genero;
}

export interface Genero {
    id: number;
    descripcion: string;
}
