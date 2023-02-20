export interface Producto {
    id: number;
    descripcion: string;
    color: string;
    precio: number;
    busqueda: number;
    imagen: string;
    marca: Genero;
    genero: Genero;
}

export interface Genero {
    id: number;
    descripcion: string;
}
