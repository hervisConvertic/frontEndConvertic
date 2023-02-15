export interface ProductoGenero {
    id: number;
    stock: number;
    talla: Talla;
    producto: Producto;
}

export interface Producto {
    id: number;
    descripcion: string;
    color: string;
    precio: number;
    busquedas: number;
    imagen: string;
    marca: Talla;
    genero: Talla;
}

export interface Talla {
    id: number;
    descripcion: string;
}


